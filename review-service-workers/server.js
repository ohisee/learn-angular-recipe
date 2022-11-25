/**
 * @fileoverview express server
 */
const path = require('path');
const express = require('express');

const server = express();
const distFolder = path.join(__dirname, 'dist', 'review-service-workers');
const port = process.env['PORT'] || 8081;

server.use('/', express.static(distFolder));

server.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
