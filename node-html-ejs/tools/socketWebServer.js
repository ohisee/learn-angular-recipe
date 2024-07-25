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

