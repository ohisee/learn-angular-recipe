/**
 * @fileoverview express server
 */
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const path = require('path');
const simpleQueryRoute = require('./routes/simpleQuery');

