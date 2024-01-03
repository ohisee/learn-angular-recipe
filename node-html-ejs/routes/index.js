/**
 * @fileoverview Index js
 */
const express = require('express');

const router = express.Router();

const users = [];

// Get uses exact match
router.get('/', (req, res, next) => {
  res.render('index.ejs', {
    pageTitle: 'Add Users',
    path: '/',
  });
});

router.post('/add-users', (req, res, next) => {
  if (req.body.name === "") {
    return res.render('index.ejs', {
      pageTitle: 'Add Users',
      path: '/add-users',
    });
  }
  users.push({
    name: req.body.name,
  });
  res.redirect('/users');
});

module.exports = {
  users: users,
  route: router,
};
