import type { Metadata } from "next";
import { HomePage } from "../home-page";
import { languageAlternates, seoDescriptions, siteUrl } from "../seo";

const title = "BJJ and Grappling Club in Tunis | Grappling Garage";

export const metadata: Metadata = {
  title: { absolute: title },
  description: seoDescriptions.en,
  keywords: [
    "BJJ Tunis",
    "grappling club Tunis",
    "Brazilian Jiu-Jitsu Tunis",
    "wrestling classes Tunis",
    "BJJ beginners Tunis",
    "kids grappling Tunis",
    "martial arts Tunis",
    "Hay Rafaha",
  ],
  alternates: {
    canonical: `${siteUrl}/en/`,
    languages: languageAlternates,
  },
  openGraph: {
    title,
    description: seoDescriptions.en,
    url: `${siteUrl}/en/`,
    locale: "en_US",
    alternateLocale: ["fr_TN", "ar_TN"],
  },
  twitter: {
    title,
    description: seoDescriptions.en,
  },
};

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
