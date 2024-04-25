/**
 * @fileoverview how to check this JavaScript code 
 */
const Walker = require('./walker');
const {fibo, printLine} = require('./reviewExport');

const check = new Walker('Speed Train', 1000.91);

check.sayYourName();

printLine('hello')(fibo(9));

