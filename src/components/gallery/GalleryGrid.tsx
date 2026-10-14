"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { galleryCategories } from "@/data/gallery";
import type { GalleryItem } from "@/types/gallery";
const ImageLightbox = dynamic(() => import("./ImageLightbox"));
export default function GalleryGrid({
  items,
  filters = false,
}: {
  items: GalleryItem[];
  filters?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const visible =
    category === "All"
      ? items
      : items.filter((item) => item.category === category);
  return (
    <div className="gallery">
      <div className="gallery-controls">
        {filters && (
          <div
            className="gallery-filters"
            role="group"
            aria-label="Filter gallery by category"
          >
            {galleryCategories.map((filter) => (
              <button
                key={filter}
                aria-pressed={category === filter}
                className={category === filter ? "selected" : ""}
                onClick={() => {
                  setCategory(filter);
                  setSelectedIndex(null);
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
        {filters && (
          <p className="gallery-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "image" : "images"}
          </p>
        )}
      </div>
      <div className="gallery-grid">
        {visible.map((item, index) => (
          <m.button
            key={item.id}
            initial={false}
            animate={
              reduce ? { opacity: 1 } : { opacity: [0.6, 1], scale: [0.98, 1] }
            }
            transition={{ duration: 0.28 }}
            className={`gallery-item ${item.tall ? "gallery-tall" : ""}`}
            onClick={() => setSelectedIndex(index)}
            aria-label={`View ${item.title}`}
            aria-haspopup="dialog"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
            />
            <span className="gallery-item-overlay">
              <span>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </span>
              <ArrowUpRight size={22} />
            </span>
            <span className="gallery-expand">
              <ArrowUpRight size={20} />
            </span>
          </m.button>
        ))}
      </div>
      {selectedIndex !== null && (
        <ImageLightbox
          items={visible}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </div>
  );
}
