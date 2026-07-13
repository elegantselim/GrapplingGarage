import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-07-12"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
