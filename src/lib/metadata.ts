import type { Metadata } from "next";
import { businessInfo } from "@/data/business";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/hero/printed-products.webp",
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${businessInfo.name}`,
      description,
      url: path,
      type: "website",
      locale: "en_LK",
      siteName: businessInfo.name,
      images: [{ url: image, alt: "Professional digital printing products" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
