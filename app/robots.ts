import type { MetadataRoute } from "next";
import { concept, siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Concept mode keeps the preview out of search results (pages also send noindex).
  return concept
    ? { rules: [{ userAgent: "*", disallow: "/" }] }
    : { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl };
}
