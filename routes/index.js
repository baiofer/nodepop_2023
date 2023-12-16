var express = require('express');
var router = express.Router();
const queryFilter = require('../lib/queryFilter');
const getTags = require('../lib/getTags')

// GET Products
router.get('/products', async (req, res, next) => {
  
  res.locals.texto = 'Hola'
  res.locals.nombre = '<script>alert("inyección de códigp")</script>'

  const ahora = new Date()
  res.locals.segundoActual = ahora.getSeconds()
  res.locals.esPar = (ahora.getSeconds()) % 2 === 0

  res.locals.usuarios = [
    { nombre: 'Smith', edad: 36 },
    { nombre: 'Jones', edad: 27 }
  ]
  console.log('TOY')
  //res.render('index', { title: 'Express' });
  res.render('index1');

});

// GET Products
router.get('/', async (req, res, next) => {
  try {
    const { products, error } = await queryFilter(req)
    console.log('products: ', products)
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
