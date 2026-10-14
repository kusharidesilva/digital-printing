import { readdir, copyFile } from "node:fs/promises";
import path from "node:path";
// Next.js 16 can export Windows separators in segment filenames, while the browser
// requests dot-separated names. Add portable aliases without altering source files.
const root = path.resolve("out");
let aliases = 0;
async function flattenSegmentDirectory(directory, routeDirectory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory())
      await flattenSegmentDirectory(file, routeDirectory);
    else if (entry.name.endsWith(".txt")) {
      const filename = path
        .relative(routeDirectory, file)
        .split(path.sep)
        .join(".");
      await copyFile(file, path.join(routeDirectory, filename));
      aliases++;
    }
  }
}
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const nested = path.join(directory, entry.name);
    if (entry.name.startsWith("__next."))
      await flattenSegmentDirectory(nested, directory);
    else await walk(nested);
  }
}
await walk(root);
console.log(
  `Static export ready${aliases ? ` (${aliases} Windows navigation data aliases added)` : ""}.`,
);
