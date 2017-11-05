const db = require('./db/controller');
const config = require('./config.json');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const SpotifyStrategy = require('passport-spotify').Strategy;

scope = [
  'user-read-email',
  'user-read-private',
  'playlist-modify-public',
  'user-top-read',
  'user-read-recently-played'
];

module.exports = function(app, passport) {
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

  app.get('/auth/',
    passport.authenticate('spotify', {scope: scope, showDialog: true}),
    function(req, res) {}
  );

  app.get('/auth/callback',
    passport.authenticate('spotify', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect(req.session.redirectTo);
  });
}
