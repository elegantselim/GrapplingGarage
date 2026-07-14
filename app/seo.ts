const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://grapplinggarage.tn";
const parsedSiteUrl = new URL(configuredSiteUrl);

if (process.env.NODE_ENV === "production" && parsedSiteUrl.protocol !== "https:") {
  throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS for production builds.");
}

export const siteUrl = parsedSiteUrl.toString().replace(/\/$/, "");

export const businessName = "Grappling Garage";
export const phoneDisplay = "+216 54 032 697";
export const phoneHref = "tel:+21654032697";
export const phoneE164 = "+21654032697";
export const whatsappHref = "https://wa.me/21654032697";

export const address = {
  streetAddress: "Rue Abdallah, Rue Farhat Hached, Hay Rafaha",
  addressLocality: "Tunis",
  postalCode: "2094",
  addressCountry: "TN",
  display: "Hay Rafaha, Rue Abdallah, Rue Farhat Hached, Tunis 2094, Tunisie",
};

const mapsDestination =
  "Grappling Garage, Hay Rafaha, Rue Abdallah, Rue Farhat Hached, Tunis 2094, Tunisia";

export const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsDestination)}&travelmode=driving`;

export const seoDescriptions = {
  fr: "Club de BJJ, grappling et wrestling à Hay Rafaha, Tunis. Cours de jiu-jitsu brésilien et lutte pour adultes, débutants et enfants de 5 à 15 ans.",
  ar: "نادي جيوجيتسو برازيلي وغرابلينغ ومصارعة في حي الرفاهة، تونس. حصص للكبار والمبتدئين والأطفال من 5 إلى 15 سنة.",
  en: "BJJ, grappling and wrestling club in Hay Rafaha, Tunis. Brazilian Jiu-Jitsu and wrestling classes for adults, beginners and children aged 5 to 15.",
} as const;

export const seoDescription = seoDescriptions.fr;

export const languageAlternates = {
  "fr-TN": `${siteUrl}/`,
  "ar-TN": `${siteUrl}/ar/`,
  en: `${siteUrl}/en/`,
  "x-default": `${siteUrl}/`,
};

export const services = [
  "Wrestling à Tunis",
  "Brazilian Jiu-Jitsu à Tunis",
  "No-gi grappling à Tunis",
  "Fitness grappling à Tunis",
  "Cours enfants à Tunis",
  "Cours adultes débutants à Tunis",
  "Club de grappling à Tunis",
  "Club de BJJ à Tunis",
  "Cours de lutte à Tunis",
];
