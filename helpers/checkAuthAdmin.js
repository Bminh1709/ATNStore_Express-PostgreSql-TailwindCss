function requireAuthAdmin(req, res, next) {
    if (req.session.admin) {
      next();
    } else {
      res.redirect('/access/user');
    }
  }
  
  module.exports = requireAuthAdmin;