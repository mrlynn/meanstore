var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Category = require('../models/category');
var Product = require('../models/product');
var Event = require('../models/events');
var async = require('async');
var Order = require('../models/order');
var User = require('../models/user');
var Payment = require('../models/payment');
var Ticket = require('../models/ticket');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
var taxConfig = require('../config/tax-config.js');
var Config = require('../config/config.js');
var taxCalc = require('../local_modules/tax-calculator');
var meanlogger = require('../local_modules/meanlogger');
var json2csv = require('json2csv');

Category.find({}, function(err,categories) {
	if (err) {
		req.session.error('error','Error retrieiving categories');
		res.redirect('/');
	}
});

/**
 * Present statistics for various database objects
 * @constructor
 */
function heredoc (f) {
	    return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
};
/**
 * GET all categories
 * @constructor
 */
router.get('/categories', function(req, res, next) {
	Category.find({},function(err,categories) {
		// res.json(categories);
		var filename = 'Categories.csv';
		var fields = ['name', 'slug', 'updated'];
		var fieldNames = ['Name', 'Slug', 'Updated'];
		var data = json2csv({ data: categories, fields: fields, fieldNames: fieldNames });
		res.set('Content-Disposition', ["attachment; filename='", filename].join(''))
		res.end(data);
	});

});

/**
 * POST - Create a product
 * @constructor
 */
router.get('/products', function (req, res){
	Product.aggregate([{
		$unwind: "$options"
	}],function(err,products) {
		// res.json(categories);
		var filename = ['Products-', Date.now()].join('');
		var fields = ['name', 'title', 'description', 'shippable','taxable','price','cost','Product_Group','options'];
		var fieldNames = ['Name', 'Title', 'Description', 'Ship?','Tax?','Price','Cost','Product_Group','Options'];
		var data = json2csv({ data: products, fields: fields, fieldNames: fieldNames });
		res.set('Content-Disposition', ["attachment; filename=", filename, '.csv'].join(''))
		res.end(data);
	});

});

/**
 * POST - Create a product
 * @constructor
 */
router.get('/users', function (req, res){

	User.aggregate([{
		$unwind: "$orders"
	}],function(err,users) {
		var filename = ['Users-', Date.now()].join('');
		var fields = ['first_name', 'last_name', 'email', 'name','ordered','sku','status'];
		var fieldNames = ['first_name', 'last_name', 'email', 'name','ordered','sku','status'];
		var data = json2csv({ data: users, fields: fields, fieldNames: fieldNames });
		res.set('Content-Disposition', ["attachment; filename=", filename, '.csv'].join(''))
		res.end(data);
	});

});

router.get('/orders', function (req, res){

	Order.aggregate([{
		$unwind: {
			path: "$cart",
			includeArrayIndex: "item_no"
		}
	}],function(err,orders) {
		var filename = ['Orders-', Date.now()].join('');
		var fields = ['_id','user.first_name', 'user.last_name', 'user.email', 'status','created','cart.product_name','cart.option','cart.product_price','cart.ticket_name','cart.ticket_email'];
		var fieldNames = ['ID','First name', 'Last Name', 'Email', 'Status','Ordered','Item','Option','Price','Ticket Name','Ticket Email'];
		var data = json2csv({ data: orders, fields: fields, fieldNames: fieldNames });
		res.set('Content-Disposition', ["attachment; filename=", filename, '.csv'].join(''))
		res.end(data);
	});

});
module.exports = router;
