var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Category = require('../models/category');
var Product = require('../models/product');
var Event = require('../models/events');
var Purchase = require('../models/purchase');
var Order = require('../models/order');
var User = require('../models/user');
var Payment = require('../models/payment');
var Ticket = require('../models/ticket');
var passport = require('passport');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var validator = require('express-validator');
var util = require('util');
var nodemailer = require('nodemailer');
var smtpConfig = require('../config/smtp-config.js');
var taxCalc = require('../local_modules/tax-calculator');
var shippingCalc = require('../local_modules/shipping-calculator');
var taxConfig = require('../config/tax-config.js');
var recommendations = require('../local_modules/recommendations');
var Config = require('../config/config.js');
const dotenv = require('dotenv');
const async = require('async');
const chalk = require('chalk');
var meanlogger = require('../local_modules/meanlogger');

dotenv.load({
	path: '.env.hackathon'
});

dotenv.load({ path: '.env.hackathon' });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  logger.log('error','%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

/* GET home page. */

Product.find({},function(err,products) {
	if (err) {
		console.log("Error: " + err.message);
	}
	async.each(products,function(product,next) {
		console.log("NAME: " + product.name);
		console.log("Product_Group: " + product.Product_Group);
		console.log("isVariable: " + product.isVariable);
		console.log("isticket: " + product.isTicket);
	})
})
