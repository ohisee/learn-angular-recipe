/**
 * @fileoverview check this
 */
const chrono = require('chrono-node');

/** @type Date|null */
const date = chrono.parseDate('Meeting at 1:30 PM');

// Intl.DateTimeFormat('en-US').resolvedOptions().timeZone
console.log(date.toLocaleString('en-US', { timeZoneName: 'long' }));

