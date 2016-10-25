var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var passport = require('passport');
var https = require('https');
var querystring = require('querystring');


// var gateway = braintree.connect({
//   accessToken: 'access_token$production$w6hd3wnxhv5cr8hv$4846ae9a612ecd4646ccf31bdfb1b816'
// });


/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err,docs) {
		productChunks = [];
		chunkSize = 3;
		for (var i = (3-chunkSize); i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize))
		}
    	res.render('shop/index', {
    		title: 'MEAN Store', 
    		products: productChunks,
    		user: req.session.user,
    		username: req.user
    	});
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

router.get('/empty-cart', isLoggedIn, function(req, res, next) {
	var cart = new Cart({});
	cart.empty();
	req.session.cart = cart;
	res.redirect('/');

});

router.get('/reduce-qty/:id/', function(req, res, next) {
	var productId = req.params.id;
	// if we have a cart, pass it - otherwise, pass an empty object
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			// replace with err handling
			return res.redirect('/');
		}
		if (!product) {
			res.render('shop/shopping-cart',{products: null, errMsg: "Product not found.",noErrors:0})
		}
		cart.reduce(product, product.id, product.price);
		req.session.cart = cart; // store cart in session
		res.redirect('/shopping-cart');
	});
});

router.get('/shopping-cart', function(req, res, next) {
	if (!req.session.cart) {
		return res.render('shop/shopping-cart', { products: null, user: req.user});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, user: req.user, noErrors:1});
})

router.get('/checkout', function(req,res, next) {
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	var errMsg = req.flash('error')[0];
	res.render('shop/checkout', {total: cart.totalPrice, errMsg, noError:!errMsg});

});

router.post('/checkout', function(req,res, next) {
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	console.log(req.body);
	var data = querystring.stringify(req.body);
	console.log('Data:'+ data);
	var options = {
		host: 'www.paypal.com',
		port: 443,
		method: 'POST',
		path: '/cgi-bin/webscr',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		}
	};
	var req = https.request(options, function(res) {
		var result = '';
		res.on('data', function(chunk) {
			result += chunk;
		});
		res.on('end', function() {
			console.log(result);
		});
		res.on('error', function(err) {
			console.log(error);
		});
	});
	req.on('error', function(err) {
		console.log(err);
	});
	req.write(data);
	req.end();

});

router.post('/complete', function(req, res, next) {
	var order = new Order({
		user: req.user,
		cart: cart,
		address: req.body.addr1,
		first_name: req.body.first_name,
		last_name: req.body.last_name

	})

})

module.exports = router;

function userInfo(req,res,next) {
	if(req.user) {
		return req.user;
	}
	return "No User";
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');	
}

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');	
} 
