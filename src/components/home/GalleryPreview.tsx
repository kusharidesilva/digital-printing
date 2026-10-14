import { galleryItems } from "@/data/gallery";
import GalleryGrid from "../gallery/GalleryGrid";
import SectionHeading from "../shared/SectionHeading";
import Button from "../shared/Button";
export default function GalleryPreview() {
  return (
    <section className="gallery-section section">
      <div className="container">
        <SectionHeading
          eyebrow="THE POSSIBILITIES, IN PRINT"
          title="A closer look at what we print."
          description="Explore the colours, textures and little details that make print worth holding onto."
          action={
            <Button href="/gallery/" variant="secondary">
              View full gallery
            </Button>
          }
        />
        <GalleryGrid items={galleryItems.slice(0, 10)} />
      </div>
    </section>
  );
}
