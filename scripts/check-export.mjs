import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(path.join(directory, entry.name))
          : path.join(directory, entry.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const pages = files.filter(
  (file) =>
    file.endsWith("index.html") &&
    !["404", "_not-found"].includes(
      path.relative(root, file).split(path.sep)[0],
    ),
);
assert.equal(
  pages.length,
  17,
  "Expected home, four directory pages and twelve service pages",
);
for (const file of pages) {
  const html = await readFile(file, "utf8");
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `${file} must have exactly one h1`,
  );
  assert.match(html, /<title>[^<]+<\/title>/, `${file} needs a title`);
  assert.match(html, /name="description"/, `${file} needs a description`);
  assert.match(html, /rel="canonical"/, `${file} needs a canonical`);
  assert.doesNotMatch(html, /<form(?:\s|>)/i, "No contact forms");
  assert.doesNotMatch(
    html,
    /lorem ipsum|demo website|portfolio project|sample website|practice project/i,
  );
  for (const match of html.matchAll(
    /(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g,
  )) {
    const url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    const local = path.join(root, decodeURIComponent(url));
    const target = url.endsWith("/") ? path.join(local, "index.html") : local;
    assert.ok(
      (await stat(target)).isFile(),
      `${file}: missing local asset or route ${url}`,
    );
  }
}
const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<url>/g) || []).length, 17);
await stat(path.join(root, "robots.txt"));
await stat(path.join(root, "_headers"));
console.log(
  `Verified ${pages.length} exported routes, all local links/assets, metadata, sitemap and Cloudflare headers.`,
);
