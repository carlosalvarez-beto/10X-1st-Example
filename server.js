const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

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

server.listen(PORT, () => {
  console.log("Abre http://localhost:" + PORT);
});
