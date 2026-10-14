import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", "http://localhost");
    const filename = decodeURIComponent(url.pathname);
    const candidate = path.resolve(root, `.${filename}`);
    if (candidate !== root && !candidate.startsWith(root + path.sep)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    let file = candidate;
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
    } catch {
      file = path.join(candidate, "index.html");
    }
    let status = 200;
    let content;
    try {
      content = await readFile(file);
    } catch {
      status = 404;
      file = path.join(root, "404.html");
      content = await readFile(file);
    }
    response.writeHead(status, {
      "Content-Type":
        mimeTypes[path.extname(file)] || "application/octet-stream",
    });
    if (request.method === "HEAD") response.end();
    else response.end(content);
  } catch {
    response.writeHead(500);
    response.end("Build the website with npm run build before previewing.");
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Static preview: http://localhost:${port}`),
);
