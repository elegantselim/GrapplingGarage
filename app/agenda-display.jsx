"use client";

import { useEffect, useMemo, useState } from "react";
import { days, getCategory, sortAgenda, starterAgenda } from "./schedule-data";

const scheduleEndpoint =
  "https://firestore.googleapis.com/v1/projects/grapplinggarage/databases/(default)/documents/schedules?pageSize=100&key=AIzaSyDVq0mlDnd6C9XbT3Kh8UBjq51wu1eM0wI";

function readString(fields, key) {
  return fields?.[key]?.stringValue;
}

function parseSchedule(payload) {
  if (!Array.isArray(payload.documents)) return [];

  return payload.documents
    .map((document) => {
      const day = readString(document.fields, "day");
      const time = readString(document.fields, "time");
      const className = readString(document.fields, "className");

      if (!days.includes(day) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || !className) {
        return null;
      }

      return {
        id: document.name.split("/").pop(),
        day,
        time,
        className,
      };
    })
    .filter(Boolean);
}

const dayLabels = {
  fr: Object.fromEntries(days.map((day) => [day, day])),
  en: {
    Lundi: "Monday",
    Mardi: "Tuesday",
    Mercredi: "Wednesday",
    Jeudi: "Thursday",
    Vendredi: "Friday",
    Samedi: "Saturday",
    Dimanche: "Sunday",
  },
  ar: {
    Lundi: "الاثنين",
    Mardi: "الثلاثاء",
    Mercredi: "الأربعاء",
    Jeudi: "الخميس",
    Vendredi: "الجمعة",
    Samedi: "السبت",
    Dimanche: "الأحد",
  },
};

const classLabels = {
  en: {
    "Jiu-jitsu": "Brazilian Jiu-Jitsu",
    Lutte: "Wrestling",
    "Enfants 5 à 10 ans": "Kids aged 5 to 10",
    "Enfants 10 à 15 ans": "Kids aged 10 to 15",
  },
  ar: {
    "Jiu-jitsu": "جيوجيتسو برازيلية",
    Lutte: "مصارعة",
    "Enfants 5 à 10 ans": "أطفال من 5 إلى 10 سنوات",
    "Enfants 10 à 15 ans": "أطفال من 10 إلى 15 سنة",
  },
};

const categoryLabels = {
  fr: { Enfants: "Enfants", Fitness: "Fitness", "Open mat": "Open mat", Lutte: "Lutte", "No-gi": "No-gi", "Jiu-jitsu": "Jiu-jitsu" },
  en: { Enfants: "Kids", Fitness: "Fitness", "Open mat": "Open mat", Lutte: "Wrestling", "No-gi": "No-gi", "Jiu-jitsu": "BJJ" },
  ar: { Enfants: "أطفال", Fitness: "لياقة", "Open mat": "تدريب مفتوح", Lutte: "مصارعة", "No-gi": "نو-غي", "Jiu-jitsu": "جيوجيتسو" },
};

const interfaceCopy = {
  fr: {
    error: "Agenda Firebase temporairement indisponible. Horaires habituels affichés.",
    aria: (day) => `Cours du ${day}`,
    count: (count) => `${count} cours`,
  },
  en: {
    error: "The live schedule is temporarily unavailable. Usual class times are shown.",
    aria: (day) => `${day} classes`,
    count: (count) => `${count} ${count === 1 ? "class" : "classes"}`,
  },
  ar: {
    error: "البرنامج المباشر غير متاح مؤقتا. نعرض المواعيد المعتادة.",
    aria: (day) => `حصص يوم ${day}`,
    count: (count) => `${count} حصص`,
  },
};

function localizeClassName(className, locale) {
  return classLabels[locale]?.[className] || className;
}

export function AgendaDisplay({ locale = "fr" }) {
  const [agenda, setAgenda] = useState(starterAgenda);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(scheduleEndpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Firestore schedule unavailable");
        return response.json();
      })
      .then((payload) => {
        const remoteAgenda = parseSchedule(payload);
        if (remoteAgenda.length > 0) setAgenda(remoteAgenda);
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") setError(true);
      });

    return () => controller.abort();
  }, []);

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
    <>
      {error && (
        <p className="mb-4 text-sm font-bold text-[#c8e4f2]" aria-live="polite">
          {interfaceCopy[locale].error}
        </p>
      )}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {agendaByDay.map((group) => (
          <section
            key={group.day}
            aria-label={interfaceCopy[locale].aria(dayLabels[locale][group.day])}
            className="overflow-hidden rounded-lg bg-white text-[#061826] shadow-sm ring-1 ring-[#244a63]"
          >
            <div className="flex items-center justify-between gap-3 bg-[#dff5ff] px-4 py-3">
              <h3 className="text-lg font-black uppercase tracking-normal text-[#0b2d46]">
                {dayLabels[locale][group.day]}
              </h3>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-[#0e7490]">
                {interfaceCopy[locale].count(group.sessions.length)}
              </span>
            </div>
            <div className="divide-y divide-[#d7eaf5]">
              {group.sessions.map((session) => (
                <article key={session.id} className="grid grid-cols-[4.75rem_1fr] gap-3 p-4">
                  <time className="flex h-12 w-16 items-center justify-center rounded-full bg-[#eef8ff] text-sm font-black text-[#0b2d46]">
                    {session.time}
                  </time>
                  <div className="min-w-0">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h4 className="text-base font-black leading-tight">{localizeClassName(session.className, locale)}</h4>
                      <span className="w-fit rounded-full bg-[#0b2d46] px-3 py-1 text-[0.68rem] font-black uppercase text-white">
                        {categoryLabels[locale][getCategory(session.className)]}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
