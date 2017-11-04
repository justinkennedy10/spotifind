
var authenticate = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/auth/');
  } else {
    return next();
  }
}

module.exports = { authenticate }