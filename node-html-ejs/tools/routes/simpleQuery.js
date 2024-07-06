/**
 * @fileoverview simple query router JS
 */
const express = require('express');
const { getSimpleQueryResult } = require('./simplePromise');

const router = express.Router();

router.get('/service/api/simple/query/options', (req, res, next) => {
  res.json({
    result: [
      'Something', 'Wonderful'
    ]
  });
});

router.get('/service/api/v2/simple/query/options', async (req, res, next) => {
  const result = await getSimpleQueryResult();
  res.json(result);
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

