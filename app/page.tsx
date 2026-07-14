import type { Metadata } from "next";
import { HomePage } from "./home-page";
import { languageAlternates, seoDescriptions, siteUrl } from "./seo";

const title = "Club BJJ et Grappling à Tunis | Grappling Garage";

export const metadata: Metadata = {
  title: { absolute: title },
  description: seoDescriptions.fr,
  alternates: {
    canonical: `${siteUrl}/`,
    languages: languageAlternates,
  },
  openGraph: {
    title,
    description: seoDescriptions.fr,
    url: `${siteUrl}/`,
    locale: "fr_TN",
    alternateLocale: ["ar_TN", "en_US"],
  },
  twitter: {
    title,
    description: seoDescriptions.fr,
  },
};

export default function FrenchHomePage() {
  return <HomePage locale="fr" />;
}
