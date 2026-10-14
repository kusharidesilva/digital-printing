import type { MetadataRoute } from "next";
import { businessInfo } from "@/data/business";
import { services } from "@/data/services";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/services/",
    "/gallery/",
    "/about/",
    "/contact/",
    ...services.map((service) => `/services/${service.slug}/`),
  ].map((path) => ({
    url: `${businessInfo.siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === "/services/" ? 0.9 : 0.7,
  }));
}
