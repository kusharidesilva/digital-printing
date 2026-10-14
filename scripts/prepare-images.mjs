import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
let prepared = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!entry.name.endsWith(".webp") || /-\d+w\.webp$/.test(entry.name))
      continue;
    const source = await stat(file);
    for (const width of [384, 640, 960]) {
      const target = file.replace(/\.webp$/, `-${width}w.webp`);
      try {
        if ((await stat(target)).mtimeMs >= source.mtimeMs) continue;
      } catch {
        /* New asset. */
      }
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 6 })
        .toFile(target);
      prepared++;
    }
  }
}
await walk("public/images");
console.log(`Responsive image variants ready (${prepared} updated).`);
