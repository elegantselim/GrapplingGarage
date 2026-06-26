import Link from "next/link";
import Employe from "../employe.jsx";

export const metadata = {
  title: "Espace employé | Grappling Garage",
  description: "Modifier l’agenda Grappling Garage.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EspaceEmployePage() {
  return (
    <main className="min-h-screen bg-[#eef8ff] px-5 py-8 text-[#061826] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-base font-black uppercase">
            Grappling Garage
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#061826] px-5 text-sm font-black uppercase text-white"
          >
            Retour accueil
          </Link>
        </nav>

        <section className="mb-6 max-w-3xl">
          <p className="text-sm font-black uppercase text-[#0e7490]">
            Espace employé
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-normal sm:text-5xl">
            Modifier l’agenda public
          </h1>
          <p className="mt-4 text-base font-semibold leading-7 text-[#31556d]">
            Ajoute, supprime ou ajuste les jours, horaires et noms des cours.
            Les changements sont enregistrés dans ce navigateur et s’affichent
            sur l’accueil.
          </p>
        </section>

        <Employe />
      </div>
    </main>
  );
}
