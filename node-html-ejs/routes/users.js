/**
 * @fileoverview User js
 */
const express = require('express');
const userData = require('./index');
const router = express.Router();

router.get('/users', (req, res, next) => {
  res.render('users.ejs', {
    users: userData.users,
    pageTitle: 'Show Users',
    path: '/users',
  });
});

module.exports = router;
