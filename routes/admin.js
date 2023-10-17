var express = require('express');
var router = express.Router();
const model = require('../models/adminModel');
const requireAuthAdmin = require('../helpers/checkAuthAdmin');

/* GET home page. */
router.get('/', requireAuthAdmin, async function(req, res, next) {
    const users = await model.getUsers();
    const shops = await model.getShops();
    res.render('admin/admin', { title: 'Admin', layout: 'layoutadmin', users: users, shops: shops });
});

router.post('/', async function(req, res, next) {
  if (req.body.action === 'fetch') {
    const toys = await model.getToysWithFilter(req.body.filter, req.body.category);
    res.json({
      data: toys
    });
  }
});


module.exports = router;
