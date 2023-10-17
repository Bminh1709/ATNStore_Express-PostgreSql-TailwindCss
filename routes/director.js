var express = require('express');
var router = express.Router();
const model = require('../models/directorModel');
const requireAuthDirector = require('../helpers/checkAuthDirector');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const shops = await model.getShops();
    const toys = await model.getToys();
    res.render('director/director', { title: 'Director', layout: 'layoutdirector', toys: toys, shops: shops });
});

router.post('/', async function(req, res, next) {
    if (req.body.action === 'fetch') {
        let toys;
        const shopId = req.body.shopId;
        if (shopId == 0)
        {
            toys = await model.getToys();
            console.log(toys);
        }
        else
        {
            toys = await model.getToysByShop(shopId);
        }
        res.json({
          data: toys
        });
      }
});


module.exports = router;
