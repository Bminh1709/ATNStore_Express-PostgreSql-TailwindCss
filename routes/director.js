var express = require('express');
var router = express.Router();
const model = require('../models/directorModel');
const requireAuthDirector = require('../helpers/checkAuthDirector');

/* GET home page. */
router.get('/', requireAuthDirector,  async function(req, res, next) {
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

router.get('/refresh', requireAuthDirector, async function(req, res, next) {
    try {
        res.json({
            data: req.session.refreshTime
        });
    } catch (error) {
        res.redirect('/error');
    }
});

router.post('/refresh', async function(req, res, next) {
    try {
        const timeSet = req.body.timeSet;
        if (timeSet == 1)
            req.session.refreshTime = 300000;
        else if (timeSet == 2)
            req.session.refreshTime = 900000;
        else if (timeSet == 3)
            req.session.refreshTime = 1800000;
        res.json({
            data: req.session.refreshTime
        });
    } catch (error) {
        res.redirect('/error');
    }
});


module.exports = router;
