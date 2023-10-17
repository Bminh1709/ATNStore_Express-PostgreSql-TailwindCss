function requireDirector(req, res, next) {
    if (req.session.user && req.session.role === 'director') {
      next(); // Allow access for director
    } else {
      res.redirect('/access/user'); // Redirect to the user login page
    }
  }
  
  module.exports = requireDirector;