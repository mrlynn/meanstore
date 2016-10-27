var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var Payment = require('../models/payment');
var passport = require('passport');
var mongoose = require('mongoose');

"use strict";

var paypal = require('paypal-rest-sdk');
require('../config/pp-config.js');
var config = {};

/* GET home page. */
router.get('/', function(req, res, next) {

	// var cart = new Cart(req.session.cart);

	Product.find(function(err,docs) {
		productChunks = [];
		chunkSize = 4;
		for (var i = (4-chunkSize); i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize))
		}
    	// res.render('shop/index', {
    	// 	title: 'MEAN Store', 
    	// 	products: productChunks,
    	// 	user: user
     //   	});
       	res.render('shop/index', {products: productChunks,user: req.user, noErrors:1});

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
		res.redirect('/');
	});
});

router.get('/product/:id/', function(req,res,next) {
	var productId = req.params.id;
	// if we have a cart, pass it - otherwise, pass an empty object
	Product.findById(productId, function(err, product) {
		if (err) {
			// replace with err handling
			return res.redirect('/');
		}
		res.render('shop/product',{product: null, errMsg: "Product not found.",noErrors:0})

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
	console.log(req.user);
	res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, user: req.user, noErrors:1});
})

router.get('/checkout', isLoggedIn, function(req,res, next) {
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	var errMsg = req.flash('error')[0];
	res.render('shop/checkout', {total: cart.totalPrice, errMsg, noError:!errMsg});

});


router.get('/paypal-test', function(req, res, next) {
	var messages = req.flash('error');
	res.render('shop/paypal-test', {error: req.flash('error')[0]});
});

router.post('/paypal-test', function(req, res, next) {
	payment = req.body.payment;
	var messages = req.flash('error');
	var error = '';
	paypal.payment.create(payment, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('shop/paypal-test', { 'error': error });
		} else {
			req.session.paymentId = payment.id;
			console.log('Create Payment' + payment);
			newPayment = Payment(payment);
			newPayment.save(function(err,newpayment) {
				if (err) {
					res.render('shop/shopping-cart',{error: 'cannot save payment'});
				}
				console.log('Payment ' + newpayment._id + ' successfully created.');
			});
			var redirectUrl;
	 		if(payment.payer.payment_method === 'paypal') {
	 			for(var i=0; i < payment.links.length; i++) {
	 				var link = payment.links[i];
	 				if (link.method === 'REDIRECT') {
	 					redirectUrl = link.href;
	 				}
	 			}
	 		}
			res.redirect(redirectUrl);
		}
	});
	console.log(payment);
	// res.render('shop/paypal-test',{result: error, payment: payment});

})

router.post('/create', function (req, res, next) {
	var method = req.body.method;
	var amount = parseFloat(req.body.amount);
	console.log(amount.toFixed(2));

	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	products = cart.generateArray();
	var payment = {
		"intent": "sale",
		"payer": {
			 "payment_method": "paypal"
		},
		"transactions": [{
			"amount": {
				"currency": "USD",
				"total": String(amount.toFixed(2))
			},
			"description": "Test Transaction",
			"item_list": {
				"items": []
			}
		}]
	};
	var item_list = [];
	for (var i = 0, len = products.length; i < len; i++) {
			var price = parseFloat(products[i].price);
			price = String(price.toFixed(2));
			qty = Number(products[i].qty);
			item = {
				"name": products[i].item.title,
				"price": price,
				"quantity": qty,
				"currency": "USD",
				"sku": products[i].item._id
			}
			payment.transactions[0].item_list.items.push(item)
	}
	
	if (method === 'paypal') {
		payment.payer.payment_method = 'paypal';
		payment.redirect_urls = {
			"return_url": "http://localhost:3000/execute",
			"cancel_url": "http://localhost:3000/cancel"
		};
	} else if (method === 'credit_card') {
		var funding_instruments = [
			{
				"credit_card": {
					"type": req.body.type.toLowerCase(),
					"number": req.body.number,
					"expire_month": req.body.expire_month,
					"expire_year": req.body.expire_year,
					"first_name": req.body.first_name,
					"last_name": req.body.last_name
				}
			}
		];
		payment.payer.payment_method = 'credit_card';
		payment.payer.funding_instruments = funding_instruments;
	}

// console.log(JSON.stringify(payment));
// var payment = {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://return.url",
//         "cancel_url": "http://cancel.url"
//     },
//     "transactions": [{
//         "item_list": {
//             "items": [{
//                 "name": "item",
//                 "sku": "item",
//                 "price": "1.00",
//                 "currency": "USD",
//                 "quantity": 1
//             },{
//                 "name": "item2",
//                 "sku": "item2",
//                 "price": "2.00",
//                 "currency": "USD",
//                 "quantity": 1
//             }]
//         },
//         "amount": {
//             "currency": "USD",
//             "total": "3.00"
//         },
//         "description": "This is the payment description."
//     }]
// };
	console.log(JSON.stringify(payment));

	paypal.payment.create(payment, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			req.session.paymentId = payment.id;
			console.log('Create Payment' + payment);
			newPayment = Payment(payment);
			newPayment.save(function(err,newpayment) {
				if (err) {
					errMsg = req.flash('error')[0]
					res.render('shop/shopping-cart',{errMsg,noError:!errMsg});
				}
				console.log('Payment ' + newpayment._id + ' successfully created.');
				errMsg = "Payment saved";
			});
			var redirectUrl;
	 		if(payment.payer.payment_method === 'paypal') {
	 			for(var i=0; i < payment.links.length; i++) {
	 				var link = payment.links[i];
	 				if (link.method === 'REDIRECT') {
	 					redirectUrl = link.href;
	 				}
	 			}
	 		}
			res.redirect(redirectUrl);
		}
	});
});

// exports.execute = function (req, res) {
// 	var paymentId = req.session.paymentId;
// 	var payerId = req.param('PayerID');

// 	var details = { "payer_id": payerId };
// 	var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
// 		if (error) {
// 			console.log(error);
// 			res.render('error', { 'error': error });
// 		} else {
// 			res.render('execute', { 'payment': payment });
// 		}
// 	});
// };


router.get('/execute', function (req, res, next) {
	var paymentId = req.session.paymentId;
	var payerId = req.param('PayerID');

	var details = { "payer_id": payerId };
	var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			res.render('execute', { 'payment': payment });
		}
	});
});

exports.cancel = function (req, res) {
  res.render('cancel');
};


router.init = function(c) {
	config = c;
	paypal.configure(c.api);
}

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
	req.session.oldUrl = req.url;
	res.redirect('/user/signin');	
}

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');	
} 
