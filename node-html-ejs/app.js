/**
 * @fileoverview App js
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index');
const addUsersRoute = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(indexRoute.route);
app.use(addUsersRoute);

// All undefined paths or routes
app.use((req, res, next) => {
  res.status(404).render('page-not-found.ejs', {
    pageTitle: 'Page not found',
  });
});

app.listen(3000);
