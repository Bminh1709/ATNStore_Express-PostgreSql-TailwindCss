var express = require('express');
var router = express.Router();
const model = require('../models/toyModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let status = false;
  if (req.session.user != undefined && req.session.user != null || req.session.shop != null)
  {
    status = true;
  }
  res.render('index', { title: 'Home', status: status });
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
