var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var braintree = require('braintree');

var gateway = braintree.connect({
  accessToken: 'access_token$production$w6hd3wnxhv5cr8hv$4846ae9a612ecd4646ccf31bdfb1b816'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err,docs) {
		productChunks = [];
		chunkSize = 3;
		for (var i = (3-chunkSize); i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize))
		}
    	res.render('shop/index', { title: 'MEAN Store', products: productChunks });
	});
});

router.post('/add-to-cart', function(req,res,next) {
	var price = req.body.price;
	var productId = req.body.id;
	var size = req.body.size || null;
	// if we have a cart, pass it - otherwise, pass an empty object
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			// replace with err handling
			return res.redirect('/');
		}
		cart.add(product, product.id, price, size);
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

router.get('/empty-cart', function(req, res, next) {
	var cart = new Cart({});
	cart.empty();
	req.session.cart = cart;
	res.redirect('/');

});

router.get('/shopping-cart', function(req, res, next) {
	if (!req.session.cart) {
		return res.render('shop/shopping-cart', { products: null});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
})

router.get('/checkout', function(req,res, next) {
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	var errMsg = req.flash('error')[0];
	res.render('shop/checkout', {total: cart.totalPrice, errMsg, noError:!errMsg});

});


module.exports = router;
