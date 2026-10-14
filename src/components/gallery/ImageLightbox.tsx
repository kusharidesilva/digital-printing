"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/types/gallery";
export default function ImageLightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: GalleryItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const touchStart = useRef<number | null>(null);
  const navigate = useCallback(
    (direction: number) =>
      setIndex(
        (current) => (current + direction + items.length) % items.length,
      ),
    [items.length],
  );
  useEffect(() => {
    const dialog = dialogRef.current;
    const focused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        navigate(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigate(-1);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      dialog?.close();
      focused?.focus();
    };
  }, [navigate]);
  const item = items[index];
  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby="lightbox-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox-toolbar">
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
        <button
          className="icon-button"
          aria-label="Close image viewer"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      <div
        className="lightbox-stage"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStart.current !== null) {
            const delta = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
          }
          touchStart.current = null;
        }}
      >
        <button
          className="lightbox-prev icon-button"
          aria-label="Previous image"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </button>
        <div className="lightbox-image">
          <Image
            key={item.id}
            src={item.image}
            alt={item.alt}
            fill
            sizes="90vw"
            loading="eager"
          />
        </div>
        <button
          className="lightbox-next icon-button"
          aria-label="Next image"
          onClick={() => navigate(1)}
        >
          <ChevronRight />
        </button>
      </div>
      <div className="lightbox-caption" aria-live="polite">
        <span>{item.category}</span>
        <h2 id="lightbox-title">{item.title}</h2>
        <p>Use arrow keys or swipe to explore</p>
      </div>
    </dialog>
  );
}
