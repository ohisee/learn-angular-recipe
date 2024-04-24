/**
 * @fileoverview multiple module exports
 */

/**
 * @param {number} n 
 */
function fibo(n) {
  const result = [0, 1];
  for (let i = 2; i <= n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result[n - 1];
}

/**
 * @param {string} msg 
 */
function printLine(msg) {
  return function(l) {
    console.log('\x1b[32m%s\x1b[0m', msg, l);
  }
}
 
module.exports = {
  fibo,
  printLine
};

