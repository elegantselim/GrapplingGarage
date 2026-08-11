import type { Metadata } from "next";
import "./globals.css";
import { businessName, seoDescription, siteUrl } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: businessName,
  title: {
    default: "Club BJJ et Grappling à Tunis | Grappling Garage",
    template: `%s | ${businessName}`,
  },
  description: seoDescription,
  keywords: [
    "grappling Tunis",
    "club grappling Tunis",
    "BJJ Tunis",
    "club BJJ Tunis",
    "cours BJJ Tunis",
    "Brazilian Jiu-Jitsu Tunis",
    "jiu-jitsu brésilien Tunis",
    "wrestling Tunis",
    "lutte Tunis",
    "cours lutte Tunis",
    "cours grappling enfants Tunis",
    "BJJ enfants Tunis",
    "sport de combat Tunis",
    "Hay Rafaha",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "IarFT5-k_ad2kMlerxg38_GDOVTBoKa1EiZXrlCSZ_s",
  },
  openGraph: {
    title: "Club BJJ et Grappling à Tunis | Grappling Garage",
    description: seoDescription,
    url: siteUrl,
    siteName: businessName,
    locale: "fr_TN",
    alternateLocale: ["ar_TN", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Club BJJ et Grappling à Tunis | Grappling Garage",
    description: seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "sports",
  other: {
    "geo.region": "TN-11",
    "geo.placename": "Tunis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
