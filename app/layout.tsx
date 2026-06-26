import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { businessName, seoDescription, siteUrl } from "./seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: businessName,
  title: {
    default: "Grappling Garage Tunis | BJJ, Wrestling, Grappling et Fitness",
    template: `%s | ${businessName}`,
  },
  description: seoDescription,
  keywords: [
    "grappling Tunis",
    "BJJ Tunis",
    "Brazilian Jiu-Jitsu Tunis",
    "wrestling Tunis",
    "lutte Tunis",
    "fitness Tunis",
    "self defense Tunis",
    "grappling kids Tunis",
    "sport de combat Tunis",
    "Hay Rafaha",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Grappling Garage Tunis | BJJ, Wrestling, Grappling et Fitness",
    description: seoDescription,
    url: siteUrl,
    siteName: businessName,
    locale: "fr_TN",
    alternateLocale: ["ar_TN", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Grappling Garage Tunis | BJJ, Wrestling et Fitness",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
