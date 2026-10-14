import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const [input, output, width = "1400"] = process.argv.slice(2);
if (!input || !output)
  throw new Error(
    "Usage: node scripts/optimize-images.mjs input.png public/images/category/name.webp [width]",
  );
await mkdir(path.dirname(output), { recursive: true });
await sharp(input)
  .resize({ width: Number(width), withoutEnlargement: true })
  .webp({ quality: 82, effort: 6 })
  .toFile(output);
console.log(`Optimized ${path.basename(output)}`);
