function requireAuthDirector(req, res, next) {
    if (req.session.director) {
      next();
    } else {
      res.redirect('/access/user');
    }
  }
  
  module.exports = requireAuthDirector;