var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var passport = require('passport');
var mongoose = require('mongoose');
var csrf = require('csurf');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {

	Product.find(function(err,docs) {
		productChunks = [];
		chunkSize = 2;
		for (var i = (2-chunkSize); i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize))
		}
    	// res.render('shop/index', {
    	// 	title: 'MEAN Store', 
    	// 	products: productChunks,
    	// 	user: user
     //   	});
       	res.render('admin/index', {products: productChunks, noErrors:1});

	});
});

router.post('/product/:id', function(req, res, next) {
	productID = req.params.id;
	Product.findById(req.params.id, function(err, product) {
		product.title = req.body.title;
		product.description = req.body.description;
		product.price = req.body.price;
		product.type = req.body.price;
		product.updated = Date.now();
		product.imagePath = req.body.imagePath;
	});
	product.save(function(err) {
		if (!err) {
			console.log("updated");
		} else {
			console.log(err);
		}
       	res.render('admin/index', {products: productChunks, noErrors:1});
	})
});

router.get('/product/:id', function(req, res, next) {
	productID = req.params.id;

	Product.findById(productID,function(err,product) {
		if (!err) {
			res.render('admin/product',{product: product});
		}
	})

	res.render

});



module.exports = router;
