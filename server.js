const http = require("http");
const fs = require("fs");
const path = require("path");

const DEFAULT_PORT = Number(process.env.PORT) || 3000;

let currentPort = DEFAULT_PORT;

const server = http.createServer((req, res) => {
  const file = req.url === "/" ? "index.html" : req.url.slice(1);
  const filePath = path.join(__dirname, file);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("No encontrado");
      return;
    }
    const ext = path.extname(filePath);
    const type =
      ext === ".html" ? "text/html; charset=utf-8" : "text/javascript; charset=utf-8";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

function startServer(port) {
  currentPort = port;
  server.listen(port, () => {
    console.log("Abre http://localhost:" + port);
  });
}

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    const nextPort = currentPort + 1;
    console.log("Puerto ocupado. Probando puerto " + nextPort + "...");
    setTimeout(() => startServer(nextPort), 200);
    return;
  }
  throw err;
});

startServer(DEFAULT_PORT);
