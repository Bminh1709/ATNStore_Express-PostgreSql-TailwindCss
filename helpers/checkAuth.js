function requireAuth(req, res, next) {
    if (req.session.shop) {
      next();
    } else {
      res.redirect('/access');
    }
  }
  
  module.exports = requireAuth;