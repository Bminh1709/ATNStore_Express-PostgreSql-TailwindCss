function requireAdmin(req, res, next) {
  if (req.session.user && req.session.role === 'admin') {
    next(); // Allow access for admin
  } else {
    res.redirect('/access/user'); // Redirect to the user login page
  }
}

module.exports = requireAdmin;