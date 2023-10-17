var express = require('express');
var router = express.Router();
const model = require('../models/toyModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Home' });
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
