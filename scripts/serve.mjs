import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(import.meta.dirname, "..");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      if (
        pathname === "/downloads/NEXUS-OS-1.0.2-beta.apk" ||
        pathname === "/downloads/latest.apk"
      ) {
        res.writeHead(307, {
          Location:
            "https://github.com/sinn1088/nexus-downloads/releases/download/v1.0.2-beta/NEXUS-OS-1.0.2-beta.apk",
        });
        res.end();
        return;
      }
      const file = resolve(
        root,
        pathname === "/" ? "index.html" : "." + pathname,
      );
      if (!file.startsWith(root + sep) || !(await stat(file)).isFile())
        throw new Error("Not found");
      res.writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
      });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  })
  .listen(5188, "127.0.0.1", () =>
    console.log("NEXUS downloads preview: http://127.0.0.1:5188"),
  );
