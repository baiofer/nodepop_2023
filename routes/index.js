var express = require('express');
var router = express.Router();
const queryFilter = require('../lib/queryFilter');
const getTags = require('../lib/getTags')

// GET Products
router.get('/products', async (req, res, next) => {
  try {
    const { products, error } = await queryFilter(req)
    if (Object.keys(error).length !== 0) {
      next(error)
    }
    res.locals.products = products
    res.render('index')

  } catch (err) {
    next(err)
  }
});

// GET Tags
router.get('/tags', async (req, res, next) =>{
  const tagsSelected = await getTags()
  res.locals.tags = tagsSelected 
  res.render('tags') 
})

module.exports = router;
