/**
 * @fileoverview console
 */
const readline = require('node:readline');
const process = require('node:process');
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


