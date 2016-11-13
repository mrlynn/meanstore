var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
const dotenv = require('dotenv');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var fs = require('fs');
var cors = require('cors');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
var bookRoutes = require('./routes/books');
var facetRoutes = require('./routes/facet');
var strongAgent = require('strong-agent');
var breadcrumbs = require('express-breadcrumbs');
var fileUpload = require('express-fileupload');
var api = require('./routes/api');
var taxCalc = require('./local_modules/tax-calculator');
var Config = require('./config/config');
var Category = require('./models/category');
var url = require("url");
var path = require("path");


var fs = require('fs');

require('./config/pp-config');

// try {
//   var configJSON = fs.readFileSync(__dirname + "/config/pp-config.json");
//   var config = JSON.parse(configJSON.toString());
// } catch (e) {
//   console.error("File config.json not found or is invalid: " + e.message);
//   process.exit(1);
// }
var app = express();
dotenv.load({ path: '.env.hackathon' });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
require('./config/passport');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

var hbs = expressHbs.create({
    helpers: {
        inc: function (value, options) {
          return parseInt(value) + 1;
        },
        option: function(value) {
          var selected = value.toLowerCase() === (this.toString()).toLowerCase() ? 'selected="selected"' : '';
          return '<option value="' + this + '" ' + selected + '>' + this + '</option>';
        }
    },
    defaultLayout: 'layout',
    extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(breadcrumbs.init());
app.use(errorHandler());

// Set Breadcrumbs home information
app.use(breadcrumbs.setHome());

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
    if (typeof res.locals.allcats != 'undefined') {
        Category.find({}, function(err, allcats) {
            if (err) {
              res.send('500','Error retrieving categories.');
            }
            if (!allcats) {
                res.send('500','Error retrieving categories.');

            }
        });
        res.locals.allcats = allcats;
    }
    res.locals.login = req.isAuthenticated();
    if (res.locals.login) {
      res.locals.admin = (req.user.role == 'admin');
    }
    res.locals.session = req.session;
    res.locals.copyright = process.env.copyright;
    res.locals.title = process.env.title;
    res.locals.pageNotes = process.env.pageNotes;
    var parsed = url.parse(req.url);
    var pageName = path.basename(parsed.pathname);
    res.locals.pageName = pageName.toLowerCase();
    next();
});


app.use(fileUpload());

app.use('/facet', facetRoutes);
app.use('/api', api);
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/category', routes);
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
