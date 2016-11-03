var Product = require('../models/product');
var User = require('../models/user');
var Order = require('../models/order');
var mongoose = require('mongoose');
var async = require('async');
mongoose.connect('localhost:27017/roundup')
Product.remove({});
Order.remove({});

