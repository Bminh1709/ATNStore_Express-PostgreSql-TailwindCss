var express = require('express');
var router = express.Router();
const model = require('../models/toyModel'); 
const requireAuth = require('../helpers/checkAuth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


router.get('/', requireAuth, async function(req, res, next) {
  try {
    let shopId = req.session.shop;
    let toys = await model.getToys(shopId);
    const categories = await model.getCategories();
    res.render('shop/toys', { title: 'Home', layout: 'layoutshop', toys: toys, categories: categories });
  } catch (error) {
    res.redirect('/error');
  }
});


// ============= ADD =============
router.get('/add', requireAuth, async function(req, res) {
  try {
    const categories = await model.getCategories();
    res.render('shop/add', { title: 'Home', layout: 'layoutshop', categories: categories });
  } catch (error) {
    res.redirect('/error');
  }
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/toy');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async function(req, res) {
  const toy = req.body;
  const image = req.file.filename;
  const shopId = req.session.shop;
  try {
    await model.addToy(toy, image, shopId);
    res.redirect('/shop');
  } catch (error) {
    res.redirect('/error');
  }
});
// ============= ADD =============


// ============= DELETE =============
router.post('/delete', async (req, res) => {
  try {
    const toyid = req.body.toyid;
    // retrieve toy to get its image
    const toyImage = await model.getToyImg(toyid);
    // Delete the toy from the database
    await model.deleteToy(toyid);
    // Now, delete the image
    const imagePath = path.join('./public/images/toy', toyImage);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting image: ${err}`);
      } else {
        console.log(`Deleted image: ${toyImage}`);
      }
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});
// ============= DELETE =============

// ============= GET TOY ON FORM =============
router.get('/toy', requireAuth, async function(req, res, next) {
  const toyid = req.query.toyid;
  const toy = await model.getToy(toyid);
  res.json({ success: true, data: toy });
});
// ============= GET TOY ON FORM =============


// ============= UPDATE =============
router.post('/update', upload.single('image'), async (req, res) => {
  try {
    let checkUpdate = false;
    const toy = req.body;
    if (req.file && req.file.filename)
    {
      const toyImage = await model.getToyImg(toy.toyid);
      const imagePath = path.join('./public/images/toy', toyImage);
      fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Error deleting image: ${err}`);
          } else {
            console.log(`Deleted image: ${toyImage}`);
          }
      });
      checkUpdate = await model.updateToyWImg(toy, req.file.filename);
    }
    checkUpdate = await model.updateToy(toy);
    if (checkUpdate)
      res.json({ success: true });
    else
      res.json({ success: false });
  } catch (error) {
    res.json({ success: false });
  }
});
// ============= UPDATE =============

module.exports = router;
