import type { Metadata } from "next";
import { HomePage } from "../home-page";
import { languageAlternates, seoDescriptions, siteUrl } from "../seo";

const title = "نادي جيوجيتسو وغرابلينغ في تونس | Grappling Garage";

export const metadata: Metadata = {
  title: { absolute: title },
  description: seoDescriptions.ar,
  keywords: [
    "جيوجيتسو تونس",
    "نادي غرابلينغ تونس",
    "جيوجيتسو برازيلي تونس",
    "مصارعة تونس",
    "رياضات قتالية تونس",
    "جيوجيتسو للأطفال تونس",
    "غرابلينغ للمبتدئين تونس",
    "حي الرفاهة",
  ],
  alternates: {
    canonical: `${siteUrl}/ar/`,
    languages: languageAlternates,
  },
  openGraph: {
    title,
    description: seoDescriptions.ar,
    url: `${siteUrl}/ar/`,
    locale: "ar_TN",
    alternateLocale: ["fr_TN", "en_US"],
  },
  twitter: {
    title,
    description: seoDescriptions.ar,
  },
};

export default function ArabicHomePage() {
  return <HomePage locale="ar" />;
}
