var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

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
  res.render('index');
});

// GET a 127.0.0.1:3000/parametro_en_ruta/63
router.get('/parametro_en_ruta/:numero', function(req, res, next) {
  const numero = req.params.numero
  res.send('He recibido el número ' + numero)
})

// GET /parametro_opcional/34
router.get('/parametro_opcional/:numero?', (req, res, next) => {
  const numero = req.params.numero
  if (numero) res.send('He recibido el número ' + numero)
  else res.send('No he recibido ningún número')
})

// GET /producto/:nombre/talla/:talla/color/:color
router.get('/producto/:nombre/talla/:talla([0-9]+)/color/:color', (req, res, next) => {
  //const nombre = req.params.nombre
  //const talla = req.params.talla
  //const color = req.params.color
  const { nombre, talla, color } = req.params
  res.send('El producto es ' + nombre + ', con talla ' + talla + ' y color ' + color)
})

module.exports = router;
