"use client";
import type { ImageLoaderProps } from "next/image";
export default function staticImageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("/images/") || !src.endsWith(".webp")) return src;
  const size =
    width <= 384 ? 384 : width <= 640 ? 640 : width <= 960 ? 960 : 1400;
  return size === 1400 ? src : src.replace(/\.webp$/, `-${size}w.webp`);
}
