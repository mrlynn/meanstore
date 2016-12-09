var Product = require('../models/product');
var User = require('../models/user');
var Order = require('../models/order');
var Category = require('../models/category');
var mongoose = require('mongoose');
var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
console.log("Creating text index for Products for " + Config.dbname + '/products');

Product.index({name: 'text',title:'text',description:'text',category:'text'});
