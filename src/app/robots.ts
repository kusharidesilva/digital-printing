import type { MetadataRoute } from "next";
import { businessInfo } from "@/data/business";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${businessInfo.siteUrl}/sitemap.xml`,
  };
}
