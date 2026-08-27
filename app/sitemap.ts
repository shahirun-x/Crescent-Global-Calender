import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/institutions",
    "/calendar",
    "/news",
    "/connect",
    "/about",
    "/contact",
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/calendar" || path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
