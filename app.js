var express = require('express');
var nodalytics = require('nodalytics');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var moment = require('moment');
var timeago = require('helper-timeago');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
const dotenv = require('dotenv');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
var passport = require('passport');
var flash = require('connect-flash');
// var validator = require('express-validator');
const { check, validationResult } = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var fs = require('fs');
var cors = require('cors');
var Prism = require('prismjs');
var marked = require('marked');
var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');
var bookRoutes = require('./routes/books');
var facetRoutes = require('./routes/facet');
var strongAgent = require('strong-agent');
var breadcrumbs = require('express-breadcrumbs');
var fileUpload = require('express-fileupload');
var api = require('./routes/api');
var exporter = require('./routes/exporter');
var taxCalc = require('./local_modules/tax-calculator');
var Config = require('./config/config');
var Category = require('./models/category');
var Product = require('./models/product');
var url = require("url");
var path = require("path");
var winston = require("winston");
var mongoSanitize = require('express-mongo-sanitize');
var docs = require("express-mongoose-docs");
var csrf = require('csurf');
var getIP = require('ipware')().get_ip;

var logger = new (winston.createLogger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'hackathon.log' })
    ]
});
var fs = require('fs');

require('./config/pp-config');

var categoryrecord = {
  "_id": "ObjectId('58485813edf44d95fb117223')",
  "name": "Television",
  "slug": "Television",
  "attributes": [ ],
  "ancestors": [ ],
  "__v": 0
};

var app = express();
if (process.env.NODE_ENV) {
  // console.log("USING .env.hackathon-" + process.env.NODE_ENV);
  dotenv.load({ path: '.env.hackathon-' + process.env.NODE_ENV });
} else {
  console.log("USING .env.hackathon" );
  dotenv.config({ path: '.env.hackathon' });
}

var options = {
  db: { native_parser: true },
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  authSource: 'admin'
}
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI,options);
if (process.env.MONGO_USER) {
  // console.log("USING MONGO_USER " + process.env.MONGO_USER);
  var URI = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@localhost:27017/hackathon';
  mongoose.connect(URI, options);
} else {
  mongoose.connect('mongodb://localhost:27017/hackathon');
}
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error in app.js Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
require('./config/passport');

var hbs = expressHbs.create({
    helpers: {
        inc: function (value, options) {
          return parseInt(value) + 1;
        },
        option: function(value) {
          var selected = value.toLowerCase() === (this.toString()).toLowerCase() ? 'selected="selected"' : '';
          return '<option value="' + this + '" ' + selected + '>' + this + '</option>';
        },
        formatDate: function (date, format) {
            return moment(date).format(format);
        },
        timeAgo: function(date) {
          return timeago(date);
        },
        JSON: function(obj) {
          return JSON.stringify(obj,null,2);
        },
        Upper: function(str) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        },
        money: function(num) {
          var p = parseFloat(num/100).toFixed(2).split(".");
          return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
              return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
          }, "") + "." + p[1];
        }
    },
    defaultLayout: 'layout',
    extname: '.hbs',
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(validator({
//   gte: function(param, num) {
//         return param >= num;
//   },
//   lte: function(param, num) {
//         return param >= num;
//   }
// }));

app.use(cookieParser());
app.use(breadcrumbs.init());
app.use(errorHandler());
app.use(mongoSanitize({
  replaceWith: '_'
}));
docs(app, mongoose); // 2nd param is optional
// Set Breadcrumbs home information
app.use(breadcrumbs.setHome());

app.use(session({
    secret:'mysecret',
    resave: false,
    saveUninitialized: false,
    // Re-use our existing mongoose connection to mongodb.
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    // 3 hours - connect mongo will hover up old sessions
    cookie: { maxAge: 180 * 60 * 1000 },
    secure: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
    // if (typeof res.locals.allcats == 'undefined') {
    Product.aggregate([{
        $sortByCount: "$category"
        }], function(err, navcats) {
        if (err || !navcats) {
          res.send('500','Error retrieving categories.');
        }
        app.set('navcats',navcats);
        // console.log("Navcats in app.js " + JSON.stringify(navcats));
        if (process.env.theme) {
          res.locals.themeurl = '/stylesheets/themes/' + process.env.theme + '.css'
        } else {
          res.locals.themeurl = '/stylesheets/main.css'
        }
        res.locals.navcats = navcats;
        res.locals.login = req.isAuthenticated();
        if (res.locals.login) {
          res.locals.admin = (req.user.role == 'admin');
        }
        Product.aggregate([{
          $sortByCount: "$Product_Group"
        }], function (err,navgroups) {
          app.set('navgroups',navgroups);
          Product.aggregate(
        [{
            $match: {
              "sale_attributes.sale": true
            }
        },{
            $group: {
                _id: "$Product_Group",
                count: {
                    $sum: 1
                }
            }
        }, {
            $sort: {
                _id: 1
            }
        }],
        function(err, salegroups) {
          if (err) {
            console.log("Err fetching salegroups");

          }
            app.set('salegroups',salegroups);
            res.locals.session = req.session;
            res.locals.copyright = process.env.copyright;
            res.locals.showRecommendations = (process.env.showRecommendations===true);
            res.locals.viewDocuments = (process.env.viewDocuments===true);
            res.locals.title = process.env.title;
            res.locals.pageNotes = process.env.pageNotes;
            res.locals.fromEmail = process.env.fromEmail;
            res.locals.viewTour = process.env.viewTour;
            var parsed = url.parse(req.url);
            var pageName = path.basename(parsed.pathname);
            res.locals.pageName = pageName.toLowerCase();
            res.locals.req = req;
            //res.locals._csrf = req.csrfToken();
            var ipInfo = getIP(req);
            next();
          });
        });
    });
});
app.use(fileUpload());
app.use(nodalytics(process.env.GA_TRACKING_ID));
app.use('/exporter', exporter);
app.use('/api', api);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/category', routes);
app.use('/', routes);

// catch 404 and forward to error handler

app.get('*', function(req, res){
  // res.status(404).send('what???', 404);
  var errorMsg = '';
  var successMsg = '';

  res.status(404).render('shop/404', {
		layout: 'eshop/blank',
		// csrfToken: req.csrfToken(),
		noErrorMsg: !errorMsg,
    errorMsg: errorMsg,
		successMsg: successMsg,
		noMessage: !successMsg,
	});
});
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render()
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
