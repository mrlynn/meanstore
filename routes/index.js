var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err,docs) {
		productChunks = [];
		chunkSize = 3;
		for (var i = 3; i < docs.length; i += chunkSize) {
			console.log(i);
			console.log('docs' + docs.length);
			productChunks.push(docs.slice(i,i+chunkSize))
		}
    	res.render('shop/index', { title: 'MEAN Store', products: productChunks });
	});
});

router.post('/add-to-cart', function(req,res,next) {
	var price = req.body.price;
	console.log('Price' + price);
	var productId = req.body.id;
	console.log(req.body);
	// if we have a cart, pass it - otherwise, pass an empty object
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			// replace with err handling
			return res.redirect('/');
		}
		cart.add(product, product.id, price);
		req.session.cart = cart; // store cart in session
		console.log(req.session.cart);
		res.redirect('/');
	});
});

router.get('/add-to-cart/:id/', function(req,res,next) {
	var productId = req.params.id;
	console.log(req.params);
	// if we have a cart, pass it - otherwise, pass an empty object
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			// replace with err handling
			return res.redirect('/');
		}
		cart.add(product, product.id, product.price);
		req.session.cart = cart; // store cart in session
		console.log(req.session.cart);
		res.redirect('/');
	});
});

module.exports = router;
