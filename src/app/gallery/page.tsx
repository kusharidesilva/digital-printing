import { pageMetadata } from "@/lib/metadata";
import { galleryItems } from "@/data/gallery";
import PageIntro from "@/components/shared/PageIntro";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CTASection from "@/components/home/CTASection";
export const metadata = pageMetadata(
  "Printing Gallery",
  "Explore business printing, marketing materials, labels, event stationery, large format printing and custom merchandise.",
  "/gallery/",
);
export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="COLOUR. TEXTURE. POSSIBILITIES."
        title={
          <>
            Good ideas look
            <br />
            <span>even better in print.</span>
          </>
        }
        description="From a small finishing touch to a bold first impression, explore the products and details we can help you bring to life."
        breadcrumb="Gallery"
      />
      <section className="container gallery-directory">
        <GalleryGrid items={galleryItems} filters />
      </section>
      <CTASection title="See something you have in mind?" />
    </>
  );
}
