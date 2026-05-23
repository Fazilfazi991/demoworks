const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = 8098;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
};

http.createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  if (pathname === "/") pathname = "/sites/index.html";
  if (pathname.endsWith("/")) pathname += "index.html";
  if (pathname.startsWith("/shared/")) pathname = `/sites${pathname}`;
  if (
    !pathname.startsWith("/sites/") &&
    !pathname.startsWith("/images/") &&
    !pathname.startsWith("/prompts/")
  ) {
    pathname = `/sites${pathname}`;
  }

  const file = path.normalize(path.join(root, pathname));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (error, buffer) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(buffer);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Preview server running at http://127.0.0.1:${port}/`);
});
