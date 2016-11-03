var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Category = require('../models/category');
var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var Payment = require('../models/payment');
var Ticket = require('../models/ticket');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
var taxConfig = require('../config/tax-config.js');
var Config = require('../config/config.js');
var taxCalc = require('../local_modules/tax-calculator');

Category.find({}, function(err,categories) {
	if (err) {
		req.session.error('error','Error retrieiving categories');
		res.redirect('/');
	}
});

/* GET products. */
router.get('/products', function(req, res, next) {
	Product.find({},function(err,products) {
		res.json(products);
	})
});

/* GET users. */
router.get('/users', function(req, res, next) {
	User.find({},function(err,users) {
		res.json(users);
	})
});

router.get('/facets/', function(req, res, next) {

})
router.get('/taxcalc/:id/:user', function(req, res, next) {
	productId = req.params.id;
	userId = req.params.user;
	taxjson = taxCalc.calculateTax(productId,userId,function(err,response) {
		res.json(response);
	});

});
/* GET tax for product based on user location and product taxable flag. */
router.get('/tax/:id/:user', function(req, res, next) {
	var productId = req.params.id;
	Product.findById(productId,function(err,product) {
		if (err) {
			res.send(500,'Problem retrieving product.');
		}
		if (product.taxable == 'Yes' || product.taxable == true) {
			User.findById(req.params.user, function(err,user) {
				if (err) {
					return res.send(500, 'Problem retrieiving user by id.');
				}
				if (!user.state || !user.city) {
					res.json({
						error: 'User does not have address.'
					})
				}
				if (user.state == taxConfig.ourStateCode || user.state == taxConfig.ourStateName) {
					taxRate = taxConfig.ourStateTaxRate;
					if (user.city.toLowerCase() == taxConfig.ourCityName.toLowerCase()) {
						taxRate = taxConfig.ourCityTaxRate;
					}
				} else { 
					taxRate = 0;
				}
				var price = Number(product.price).toFixed(2);
				console.log('Price: ' + price);
				taxAmount = Math.round((price * taxRate) * 100) / 100;
				priceWithTax = (parseFloat(price) + parseFloat(taxAmount));
				res.json({
					productId: productId,
					taxable: product.taxable,
					price: parseFloat(price),
					taxRate: taxRate,
					taxAmount: taxAmount,
					priceWithTax: priceWithTax
				})
			})

		}
	})
});

router.get('/search', function(req, res, next) {

	MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
	  if (err) throw err

	  db.collection('mammals').find().toArray(function (err, result) {
	    if (err) throw err

	    console.log(result)
	  })
	})



})


module.exports = router;


