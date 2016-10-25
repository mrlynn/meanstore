var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var braintreeWeb = require('braintree-web');
var braintree = require('braintree');

var routes = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();
mongoose.connect('localhost:27017/roundup');
require('./config/passport');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

var hbs = expressHbs.create({
    helpers: {
        inc: function (value, options) {
          return parseInt(value) + 1;
        }
    },
    defaultLayout: 'layout',
    extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());

app.use(session({
  secret:'mysecret',
  resave: false, 
  saveUninitialized: false,
  // Re-use our existing mongoose connection to mongodb.
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  // 3 hours - connect mongo will hover up old sessions
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Create global logged in variable login to indicate whether the user is logged in or not.
app.use(function(req,res,next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session; // make sure that session is available in all templates, etc.
  next();
})

app.use('/user', userRoutes);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
