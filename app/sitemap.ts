import type { MetadataRoute } from "next";
import { languageAlternates, siteUrl } from "./seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/ar/", "/en/"].map((path, index) => ({
      url: `${siteUrl}${path || "/"}`,
      lastModified: new Date("2026-07-14"),
      changeFrequency: "weekly",
      priority: index === 0 ? 1 : 0.9,
      alternates: {
        languages: languageAlternates,
      },
    }));
}
