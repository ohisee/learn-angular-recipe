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

router.post('/service/api/series', (req, res, next) => {
  console.log(req.body);
  res.json({
    series: ['Something', 'Wonderful']
  })
});

module.exports = {
  route: router
};

