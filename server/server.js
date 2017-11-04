const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');
const SpotifyStrategy = require('passport-spotify').Strategy;

const db = require('./db/controller');
const config = require('./config.json');
const authenticate = require('./authentication').authenticate;

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new SpotifyStrategy({
    clientID: config.spotifyClientId,
    clientSecret: config.spotifySecret,
    callbackURL: "/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    db.saveUser({
      id: profile.id,
      access_token: accessToken,
      refresh_token: refreshToken
    })
     return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'build/landing.html'));
  }
});

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.get('/auth/',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res) {}
);

app.get('/auth/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
});

app.get('/api/playlist/:id', authenticate, function (req, res) {
  db.getPlaylistById(req.params.id).then(function (playlist) {
    res.json(playlist);
  }).catch(function (err) {
    res.json(err);
  })
});

app.get('/*', authenticate, function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build/index.html'));
});

app.listen(3000);
