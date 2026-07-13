export const starterAgenda = [
  { id: "lundi-1230-jiu-jitsu", day: "Lundi", time: "12:30", className: "Jiu-jitsu" },
  { id: "lundi-1900-lutte", day: "Lundi", time: "19:00", className: "Lutte" },
  { id: "mardi-1230-lutte", day: "Mardi", time: "12:30", className: "Lutte" },
  { id: "mardi-1700-enfants-5-10", day: "Mardi", time: "17:00", className: "Enfants 5 à 10 ans" },
  { id: "mardi-1900-jiu-jitsu", day: "Mardi", time: "19:00", className: "Jiu-jitsu" },
  { id: "mercredi-1230-jiu-jitsu", day: "Mercredi", time: "12:30", className: "Jiu-jitsu" },
  { id: "mercredi-1700-enfants-10-15", day: "Mercredi", time: "17:00", className: "Enfants 10 à 15 ans" },
  { id: "mercredi-1900-lutte", day: "Mercredi", time: "19:00", className: "Lutte" },
  { id: "jeudi-1230-lutte", day: "Jeudi", time: "12:30", className: "Lutte" },
  { id: "jeudi-1900-jiu-jitsu", day: "Jeudi", time: "19:00", className: "Jiu-jitsu" },
  { id: "vendredi-1200-jiu-jitsu", day: "Vendredi", time: "12:00", className: "Jiu-jitsu" },
  { id: "vendredi-1900-lutte", day: "Vendredi", time: "19:00", className: "Lutte" },
  { id: "samedi-0930-enfants-5-10", day: "Samedi", time: "09:30", className: "Enfants 5 à 10 ans" },
  { id: "samedi-1100-enfants-10-15", day: "Samedi", time: "11:00", className: "Enfants 10 à 15 ans" },
  { id: "dimanche-0930-enfants-5-10", day: "Dimanche", time: "09:30", className: "Enfants 5 à 10 ans" },
  { id: "dimanche-1100-enfants-10-15", day: "Dimanche", time: "11:00", className: "Enfants 10 à 15 ans" },
];

export const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export function sortAgenda(agenda) {
  return [...agenda].sort((a, b) => {
    const dayOrder = days.indexOf(a.day) - days.indexOf(b.day);
    return dayOrder || a.time.localeCompare(b.time);
  });
}

export function getCategory(className) {
  const lowerName = className.toLowerCase();

  if (lowerName.includes("kids") || lowerName.includes("enfants")) return "Enfants";
  if (lowerName.includes("fitness") || lowerName.includes("conditioning")) return "Fitness";
  if (lowerName.includes("open")) return "Open mat";
  if (lowerName.includes("wrestling") || lowerName.includes("lutte")) return "Lutte";
  if (lowerName.includes("no-gi")) return "No-gi";
  return "Jiu-jitsu";
}
