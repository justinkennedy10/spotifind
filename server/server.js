const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/');
  } else {
    return next();
  }
}

require('./authentication')(app, passport);

app.use(express.static(path.resolve(__dirname, '..', 'build')))

require('./api')(app, authenticate);

app.get('/*', authenticate, function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build/index.html'));
});

app.listen(3000);
