/**
 * @fileoverview express server
 */
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const path = require('path');
const simpleQueryRoute = require('./routes/simpleQuery');

const server = express();
const sockerServer = createServer(server);
const io = new Server(sockerServer);

const port = 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.use(simpleQueryRoute.route);

io.on('connection', (socket) => {
  console.log('Socket IO running');

  socket.on('disconnect', () => {
    console.log('disconneted');
  });
});

io.on('connection', (socket) => {
  socket.on('link clicked', (message) => {
    console.log(message);
  });

  socket.on('broadcast message', (message) => {
    io.emit('broadcast message', message);
  });
});

sockerServer.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', `Server started listening on port ${port}`);
});

