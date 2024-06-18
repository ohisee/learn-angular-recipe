/**
 * @fileoverview simple query router JS
 */
const express = require('express');

const router = express.Router();

router.get('/service/api/simple', (req, res, next) => {
  res.json({
    result: [
      'Something', 'Wonderful'
    ]
  });
});

module.exports = {
  route: router
};

