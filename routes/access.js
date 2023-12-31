var express = require('express');
var router = express.Router();
const model = require('../models/authModel'); 
const multer = require('multer');
const upload = multer();
const db = require('../databasebg'); 


/* GET users listing. */
router.get('/', function(req, res) {
    if (req.session && req.session.shop || req.session.user) {
        res.redirect('/');
    }
    else {
        res.render('shop/access', { 
            title: 'Sign In', 
            layout: 'layoutshop'});
    }
});
  
// Access for shop
router.post('/', upload.none(), async (req, res) => {
    try {
        const shop = {
            username: req.body.username,
            password: req.body.password,
        };
        const checkAccount = await model.isShopExist(shop.username, shop.password);
        if (checkAccount) {
            req.session.shop = checkAccount;
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.redirect('/error');
    }
});

// Access for user
router.get('/user', function(req, res) {
    if (req.session && req.session.user || req.session.shop) {
        res.redirect('/');
    }
    else {
        res.render('user/login', { 
        title: 'Sign In'});
    }
});
router.post('/user', upload.none(), async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        };
        const getAccount = await model.isUserExist(user.username, user.password);
        if (getAccount) {
            console.log(getAccount.rolename)
            if (getAccount.rolename === 'director')
            {
                req.session.user = true;
                req.session.role = 'director';
                res.json({ success: true, data: 1 });
            }
            else if (getAccount.rolename === 'admin')
            {
                req.session.user = true;
                req.session.role = 'admin';
                res.json({ success: true, data: 2 });
            }
            else
            {
                req.session.user = true;
                res.json({ success: true });
            }
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.redirect('/error');
    }
});

router.get('/logout', async (req, res) => {
    if (req.session && req.session.user || req.session.shop)
    {
        req.session.destroy();
        res.redirect('/');
    }
    else {
        res.redirect('/access');
    }
});
module.exports = router;