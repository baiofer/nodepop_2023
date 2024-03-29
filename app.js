var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const sessionAuthMiddleware = require('./lib/sessionAuthMiddleware')
//const basiAuthMiddleware = require('./lib/basicAuthMiddleware')
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware')
const TagsController = require('./controllers/TagsController')
const ProductsController = require('./controllers/ProductsController')
const LoginController = require('./controllers/LoginController');
const ChangeLocaleController = require('./controllers/ChangeLocaleController')
const ProductController = require('./controllers/ProductController')
const i18n = require('./lib/i18nConfigure');

// DB Connection
require('./lib/connectMongoose')

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// App title
app.locals.title = 'NodePop'

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));

// Global routes
const loginController = new LoginController()

// API routes
app.post('/api/login', loginController.postJWT)
app.use('/api/tags',     jwtAuthMiddleware, require('./routes/api/tags'))
app.use('/api', require('./routes/api/products'))
app.use('/api/products', jwtAuthMiddleware, require('./routes/api/products'))

// WEBsite routes
const productsController = new ProductsController()
const tagsController = new TagsController()
const changeLocaleController = new ChangeLocaleController()
const productController = new ProductController()

// Init internationalization
app.use(i18n.init)
// Init session
app.use(session({
  name: 'nodepop-session',
  secret: 'aBAxXS€^417$',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },  //2 días
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI})
}))
// Put the session object disponible in views.
app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})
// Public routes
// Redirection of language change
app.get('/change-locale/:locale', changeLocaleController.index)
// Public list of all products
app.get('/',       productsController.adverts)
// Login page
app.get('/login',  loginController.index)
app.post('/login', loginController.post)
app.get('/logout', loginController.logout)
// Private routes
// Private list of user products
app.get('/products', sessionAuthMiddleware, productsController.index)
// Private list of tags
app.get('/tags', sessionAuthMiddleware, tagsController.index)
// New product
app.get('/newProduct', sessionAuthMiddleware, productController.new)
app.post('/newProduct', sessionAuthMiddleware, productController.postNewProduct)
app.get('/deleteProduct/:productId', sessionAuthMiddleware, productController.deleteProduct)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {

  if (err.array) {
    const errorInfo = err.errors[0]
    console.log(errorInfo)
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.path} ${errorInfo.msg}`
    err.status = 422
  }
  // Send error code
  res.status(err.status || 500);

  // If error in API request
  // response of error in json format
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message })
    return
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
