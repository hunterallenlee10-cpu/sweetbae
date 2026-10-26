import type { MetadataRoute } from "next";
import { pages, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((p) => ({
    url: `${siteUrl}${p.path === "/" ? "" : p.path}`,
    changeFrequency: p.path.startsWith("/menus") ? "weekly" : "monthly",
    priority: p.path === "/" ? 1 : p.path.startsWith("/menus") ? 0.9 : 0.7,
  }));
}
