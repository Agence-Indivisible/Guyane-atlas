const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

const server = http.createServer((req, res) => {
  // Décode l'URL pour gérer espaces, apostrophes, etc.
  const decodedUrl = decodeURIComponent(req.url);
  // Définit le chemin du fichier demandé
  let filePath = path.join(__dirname, decodedUrl);

  // Si la racine, charge index.html par défaut
  if (decodedUrl === '/' || decodedUrl === '') {
    filePath = path.join(__dirname, 'index.html');
  }

  // Vérifie que le fichier existe
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.end('404 Not Found');
      return;
    }

    // Lit et renvoie le fichier
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('500 Internal Server Error');
        return;
      }

      // Content-Type basique (tu peux ajouter plus de cas si besoin)
      let ext = path.extname(filePath).toLowerCase();
      let contentType = 'text/plain';
      if (ext === '.html') contentType = 'text/html';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';

      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
