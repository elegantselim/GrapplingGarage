"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

const agendaStorageKey = "grappling-garage-agenda";
const agendaVersionKey = "grappling-garage-agenda-version";
const agendaVersion = "3";

export const starterAgenda = [
  {
    id: 1,
    day: "Lundi",
    time: "17:30",
    className: "Kids wrestling - coordination",
  },
  {
    id: 2,
    day: "Lundi",
    time: "18:30",
    className: "BJJ adultes - bases et positions",
  },
  {
    id: 3,
    day: "Mardi",
    time: "18:00",
    className: "Fitness grappling - force et cardio",
  },
  {
    id: 4,
    day: "Mardi",
    time: "19:00",
    className: "No-gi grappling - transitions",
  },
  {
    id: 5,
    day: "Mercredi",
    time: "17:30",
    className: "BJJ kids - technique et jeux",
  },
  {
    id: 6,
    day: "Mercredi",
    time: "19:00",
    className: "Wrestling adultes - takedowns",
  },
  {
    id: 7,
    day: "Jeudi",
    time: "18:15",
    className: "BJJ adultes - contrôle et sorties",
  },
  {
    id: 8,
    day: "Jeudi",
    time: "19:15",
    className: "Fitness grappling - conditioning",
  },
  {
    id: 9,
    day: "Vendredi",
    time: "18:00",
    className: "Wrestling - défense et équilibre",
  },
  {
    id: 10,
    day: "Vendredi",
    time: "19:00",
    className: "No-gi grappling - sparring encadré",
  },
  {
    id: 11,
    day: "Samedi",
    time: "10:00",
    className: "Kids grappling - confiance et respect",
  },
  {
    id: 12,
    day: "Samedi",
    time: "11:15",
    className: "Open mat - grappling libre",
  },
];

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function sortAgenda(agenda) {
  return [...agenda].sort((a, b) => {
    const dayOrder = days.indexOf(a.day) - days.indexOf(b.day);
    return dayOrder || a.time.localeCompare(b.time);
  });
}

function getCategory(className) {
  const lowerName = className.toLowerCase();

  if (lowerName.includes("kids")) {
    return "Enfants";
  }

  if (lowerName.includes("fitness") || lowerName.includes("conditioning")) {
    return "Fitness";
  }

  if (lowerName.includes("open")) {
    return "Open mat";
  }

  if (lowerName.includes("wrestling")) {
    return "Wrestling";
  }

  if (lowerName.includes("no-gi")) {
    return "No-gi";
  }

  return "BJJ";
}

function useAgendaState() {
  const snapshot = useSyncExternalStore(
    (onStoreChange) => {
      function syncAgenda(event) {
        if (!event.key || event.key === agendaStorageKey) {
          onStoreChange();
        }
      }

      window.addEventListener("storage", syncAgenda);
      window.addEventListener("grappling-garage-agenda-change", onStoreChange);

      return () => {
        window.removeEventListener("storage", syncAgenda);
        window.removeEventListener(
          "grappling-garage-agenda-change",
          onStoreChange,
        );
      };
    },
    () => {
      const storedVersion = window.localStorage.getItem(agendaVersionKey);

      if (storedVersion !== agendaVersion) {
        return JSON.stringify(starterAgenda);
      }

      return (
        window.localStorage.getItem(agendaStorageKey) ||
        JSON.stringify(starterAgenda)
      );
    },
    () => JSON.stringify(starterAgenda),
  );

  const agenda = useMemo(() => {
    try {
      return JSON.parse(snapshot);
    } catch {
      return starterAgenda;
    }
  }, [snapshot]);

  function saveAgenda(nextAgenda) {
    window.localStorage.setItem(agendaVersionKey, agendaVersion);
    window.localStorage.setItem(agendaStorageKey, JSON.stringify(nextAgenda));
    window.dispatchEvent(new Event("grappling-garage-agenda-change"));
  }

  return [agenda, saveAgenda];
}

export function AgendaDisplay() {
  const [agenda] = useAgendaState();
  const orderedAgenda = useMemo(() => sortAgenda(agenda), [agenda]);
  const agendaByDay = useMemo(
    () =>
      days
        .map((day) => ({
          day,
          sessions: orderedAgenda.filter((session) => session.day === day),
        }))
        .filter((group) => group.sessions.length > 0),
    [orderedAgenda],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {agendaByDay.map((group) => (
        <section
          key={group.day}
          aria-label={`Cours du ${group.day}`}
          className="overflow-hidden rounded-lg bg-white text-[#061826] shadow-sm ring-1 ring-[#244a63]"
        >
          <div className="flex items-center justify-between gap-3 bg-[#dff5ff] px-4 py-3">
            <h3 className="text-lg font-black uppercase tracking-normal text-[#0b2d46]">
              {group.day}
            </h3>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#0e7490]">
              {group.sessions.length} cours
            </span>
          </div>
          <div className="divide-y divide-[#d7eaf5]">
            {group.sessions.map((session) => (
              <article
                key={session.id}
                className="grid grid-cols-[4.75rem_1fr] gap-3 p-4"
              >
                <time className="flex h-12 w-16 items-center justify-center rounded-full bg-[#eef8ff] text-sm font-black text-[#0b2d46]">
                  {session.time}
                </time>
                <div className="min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h4 className="text-base font-black leading-tight">
                      {session.className}
                    </h4>
                    <span className="w-fit rounded-full bg-[#0b2d46] px-3 py-1 text-[0.68rem] font-black uppercase text-white">
                      {getCategory(session.className)}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Employe() {
  const [agenda, saveAgenda] = useAgendaState();
  const [draft, setDraft] = useState({
    day: "Lundi",
    time: "18:00",
    className: "Nouveau cours",
  });

  const orderedAgenda = useMemo(
    () => sortAgenda(agenda),
    [agenda],
  );

  function updateSession(id, field, value) {
    saveAgenda(
      agenda.map((session) =>
        session.id === id ? { ...session, [field]: value } : session,
      ),
    );
  }

  function addSession(event) {
    event.preventDefault();
    saveAgenda([
      ...agenda,
      {
        id: Date.now(),
        ...draft,
      },
    ]);
  }

  function removeSession(id) {
    saveAgenda(agenda.filter((session) => session.id !== id));
  }

  function resetAgenda() {
    saveAgenda(starterAgenda);
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
                  onChange={(event) =>
                    updateSession(session.id, "day", event.target.value)
                  }
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
                  onChange={(event) =>
                    updateSession(session.id, "time", event.target.value)
                  }
                  type="time"
                  className="h-11 rounded-md border border-[#c9e3f2] bg-[#f4fbff] px-3 text-sm font-bold text-[#061826]"
                />
              </label>
              <label className="grid gap-1 text-xs font-black uppercase text-[#31556d]">
                Cours
                <input
                  value={session.className}
                  onChange={(event) =>
                    updateSession(session.id, "className", event.target.value)
                  }
                  className="h-11 rounded-md border border-[#c9e3f2] bg-[#f4fbff] px-3 text-sm font-bold text-[#061826]"
                />
              </label>
              <button
                type="button"
                onClick={() => removeSession(session.id)}
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
        onSubmit={addSession}
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
            Les changements sont enregistrés dans ce navigateur et s’affichent
            sur l’accueil.
          </p>
        </div>

        <label className="grid gap-1 text-xs font-black uppercase text-white/70">
          Jour
          <select
            data-testid="agenda-day"
            value={draft.day}
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
          className="h-12 rounded-full bg-[#7ee7e0] px-5 text-sm font-black uppercase text-[#061826]"
        >
          Ajouter un cours
        </button>
        <button
          type="button"
          onClick={resetAgenda}
          className="h-12 rounded-full border border-white/30 px-5 text-sm font-black uppercase text-white"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
}
