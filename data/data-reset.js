var Product = require('../models/product');
var User = require('../models/user');
var Orders = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

Product.remove();
User.remove();
Orders.remove();
