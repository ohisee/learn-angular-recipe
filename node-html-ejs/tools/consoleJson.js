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

function showJson(/** @type String */ input) {
  setTimeout(() => {
    if (input === '') {
      console.log("empty input");
      return;
    }
    const start = 0 + 1;
    const end = input.lastIndexOf('"');
    const inputStr = input.substring(start, end);
    const jj = JSON.parse(inputStr.replace(/\\/g, ''));
    const fj = JSON.stringify(jj, null, 2);
    console.log('\x1b[32m%s\x1b[0m', fj);
  }, 100);
}

