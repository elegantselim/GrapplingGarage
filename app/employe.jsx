"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db, enableFirebaseAnalytics } from "./firebase";
import { days, sortAgenda, starterAgenda } from "./schedule-data";

const scheduleCollection = collection(db, "schedules");

function useAgendaState() {
  const [agenda, setAgenda] = useState(starterAgenda);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasRemoteAgenda, setHasRemoteAgenda] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");
  const scheduleIds = useRef([]);

  useEffect(() => {
    void enableFirebaseAnalytics();

    return onSnapshot(
      scheduleCollection,
      (snapshot) => {
        const remoteAgenda = snapshot.docs
          .map((schedule) => {
            const data = schedule.data();

            if (
              !days.includes(data.day) ||
              typeof data.time !== "string" ||
              typeof data.className !== "string"
            ) {
              return null;
            }

            return {
              id: schedule.id,
              day: data.day,
              time: data.time,
              className: data.className,
            };
          })
          .filter(Boolean);

        scheduleIds.current = snapshot.docs.map((schedule) => schedule.id);
        setHasRemoteAgenda(remoteAgenda.length > 0);
        setIsConnected(true);
        setAgenda(remoteAgenda.length > 0 ? remoteAgenda : starterAgenda);
        setIsLoading(false);
        setError("");
      },
      () => {
        setIsConnected(false);
        setIsLoading(false);
        setError("Agenda indisponible. Vérifiez la configuration Firebase.");
      },
    );
  }, []);

  const runMutation = useCallback(async (mutation) => {
    setIsSaving(true);
    setError("");

    try {
      await mutation();
      return true;
    } catch (mutationError) {
      console.error("Firestore schedule write failed", mutationError);
      setError("Enregistrement impossible. Vérifiez la configuration Firebase.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const updateSession = useCallback((id, field, value) => {
    setAgenda((currentAgenda) =>
      currentAgenda.map((session) =>
        session.id === id ? { ...session, [field]: value } : session,
      ),
    );
  }, []);

  const saveSession = useCallback(
    async (session) => {
      const className = session.className.trim();

      if (!className) {
        setAgenda((currentAgenda) =>
          currentAgenda.map((currentSession) =>
            currentSession.id === session.id
              ? { ...currentSession, className: "Nouveau cours" }
              : currentSession,
          ),
        );
        setError("Le nom du cours ne peut pas être vide.");
        return;
      }

      await runMutation(() =>
        updateDoc(doc(scheduleCollection, session.id), {
          day: session.day,
          time: session.time,
          className,
          updatedAt: serverTimestamp(),
        }),
      );
    },
    [runMutation],
  );

  const addSession = useCallback(
    async (session) => {
      return runMutation(() =>
        addDoc(scheduleCollection, {
          day: session.day,
          time: session.time,
          className: session.className.trim(),
          updatedAt: serverTimestamp(),
        }),
      );
    },
    [runMutation],
  );

  const removeSession = useCallback(
    async (id) => {
      await runMutation(() => deleteDoc(doc(scheduleCollection, id)));
    },
    [runMutation],
  );

  const resetAgenda = useCallback(async () => {
    await runMutation(async () => {
      const batch = writeBatch(db);

      scheduleIds.current.forEach((id) => {
        batch.delete(doc(scheduleCollection, id));
      });

      starterAgenda.forEach((session) => {
        batch.set(doc(scheduleCollection, session.id), {
          day: session.day,
          time: session.time,
          className: session.className,
          updatedAt: serverTimestamp(),
        });
      });

      await batch.commit();
    });
  }, [runMutation]);

  return {
    agenda,
    error,
    hasRemoteAgenda,
    isConnected,
    isLoading,
    isSaving,
    updateSession,
    saveSession,
    addSession,
    removeSession,
    resetAgenda,
  };
}

export default function Employe() {
  const {
    agenda,
    error,
    hasRemoteAgenda,
    isConnected,
    isLoading,
    isSaving,
    updateSession,
    saveSession,
    addSession,
    removeSession,
    resetAgenda,
  } = useAgendaState();
  const [draft, setDraft] = useState({
    day: "Lundi",
    time: "18:00",
    className: "Nouveau cours",
  });

  const orderedAgenda = useMemo(
    () => sortAgenda(agenda),
    [agenda],
  );
  const hasSeededAgenda = useRef(false);

  useEffect(() => {
    if (
      isLoading ||
      !isConnected ||
      hasRemoteAgenda ||
      hasSeededAgenda.current
    ) {
      return;
    }

    hasSeededAgenda.current = true;
    void resetAgenda();
  }, [hasRemoteAgenda, isConnected, isLoading, resetAgenda]);

  async function handleAddSession(event) {
    event.preventDefault();

    if (!draft.className.trim()) {
      return;
    }

    const wasSaved = await addSession(draft);

    if (wasSaved) {
      setDraft((current) => ({ ...current, className: "Nouveau cours" }));
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_0.7fr]">
      <div
        data-testid="agenda-list"
        className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#244a63]"
      >
        <div className="grid gap-px bg-[#c9e3f2]">
          {orderedAgenda.map((session) => (
            <article
              key={session.id}
              className="grid gap-3 bg-white p-4 sm:grid-cols-[0.75fr_0.55fr_1fr_auto] sm:items-center"
            >
              <label className="grid gap-1 text-xs font-black uppercase text-[#31556d]">
                Jour
                <select
                  value={session.day}
                  disabled={!isConnected || isSaving}
                  onChange={(event) =>
                    updateSession(session.id, "day", event.target.value)
                  }
                  onBlur={() => void saveSession(session)}
                  className="h-11 rounded-md border border-[#c9e3f2] bg-[#f4fbff] px-3 text-sm font-bold text-[#061826]"
                >
                  {days.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs font-black uppercase text-[#31556d]">
                Heure
                <input
                  value={session.time}
                  disabled={!isConnected || isSaving}
                  onChange={(event) =>
                    updateSession(session.id, "time", event.target.value)
                  }
                  onBlur={() => void saveSession(session)}
                  type="time"
                  className="h-11 rounded-md border border-[#c9e3f2] bg-[#f4fbff] px-3 text-sm font-bold text-[#061826]"
                />
              </label>
              <label className="grid gap-1 text-xs font-black uppercase text-[#31556d]">
                Cours
                <input
                  value={session.className}
                  disabled={!isConnected || isSaving}
                  onChange={(event) =>
                    updateSession(session.id, "className", event.target.value)
                  }
                  onBlur={() => void saveSession(session)}
                  className="h-11 rounded-md border border-[#c9e3f2] bg-[#f4fbff] px-3 text-sm font-bold text-[#061826]"
                />
              </label>
              <button
                type="button"
                disabled={!isConnected || isSaving}
                onClick={() => void removeSession(session.id)}
                className="h-11 rounded-md bg-[#0b2d46] px-4 text-sm font-black uppercase text-white"
              >
                Supprimer
              </button>
            </article>
          ))}
        </div>
      </div>

      <form
        data-testid="agenda-form"
        onSubmit={handleAddSession}
        className="grid content-start gap-4 rounded-lg bg-[#0b2d46] p-5 text-white shadow-sm ring-1 ring-[#244a63]"
      >
        <div>
          <p className="text-sm font-black uppercase text-[#7ee7e0]">
            Employé
          </p>
          <h3 className="mt-1 text-2xl font-black">
            Modifier seulement l’agenda
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
            Les changements validés sont publiés immédiatement sur l’accueil.
          </p>
          <p className="mt-2 text-xs font-bold text-[#7ee7e0]">
            Accès validé par le code PIN
          </p>
        </div>

        {(isLoading || isSaving || error) && (
          <p className="text-sm font-bold text-white/80" aria-live="polite">
            {error || (isSaving ? "Enregistrement..." : "Chargement de l’agenda...")}
          </p>
        )}

        <label className="grid gap-1 text-xs font-black uppercase text-white/70">
          Jour
          <select
            data-testid="agenda-day"
            value={draft.day}
            disabled={!isConnected || isSaving}
            onChange={(event) =>
              setDraft((current) => ({ ...current, day: event.target.value }))
            }
            className="h-12 rounded-md bg-white px-3 text-sm font-bold text-[#061826]"
          >
            {days.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-xs font-black uppercase text-white/70">
          Heure
          <input
            data-testid="agenda-time"
            value={draft.time}
            disabled={!isConnected || isSaving}
            onChange={(event) =>
              setDraft((current) => ({ ...current, time: event.target.value }))
            }
            type="time"
            className="h-12 rounded-md bg-white px-3 text-sm font-bold text-[#061826]"
          />
        </label>
        <label className="grid gap-1 text-xs font-black uppercase text-white/70">
          Cours
          <input
            data-testid="agenda-class"
            value={draft.className}
            disabled={!isConnected || isSaving}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                className: event.target.value,
              }))
            }
            className="h-12 rounded-md bg-white px-3 text-sm font-bold text-[#061826]"
          />
        </label>
        <button
          data-testid="agenda-add"
          type="submit"
          disabled={!isConnected || isSaving}
          className="h-12 rounded-full bg-[#7ee7e0] px-5 text-sm font-black uppercase text-[#061826] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ajouter un cours
        </button>
        <button
          type="button"
          disabled={!isConnected || isSaving}
          onClick={() => void resetAgenda()}
          className="h-12 rounded-full border border-white/30 px-5 text-sm font-black uppercase text-white"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
}
