var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basiAuthMiddleware = require('./lib/basicAuthMiddleware')
const TagsController = require('./controllers/TagsController')
const ProductsController = require('./controllers/ProductsController')

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

// API routes
app.use('/api/tags',     basiAuthMiddleware, require('./routes/api/tags'))
app.use('/api/products', basiAuthMiddleware, require('./routes/api/products'))


// WEB routes
const productsController = new ProductsController()
const tagsController = new TagsController()

app.get('/', productsController.index)
app.get('/products', productsController.index)
app.get('/tags', tagsController.index)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
