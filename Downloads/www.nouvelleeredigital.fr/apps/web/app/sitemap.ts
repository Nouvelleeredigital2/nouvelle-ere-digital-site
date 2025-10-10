import { routes } from "@/config/routes.config";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return routes.map((r) => ({ url: new URL(r.path, base).toString(), lastModified: new Date() }));
}
