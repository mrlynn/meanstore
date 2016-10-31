var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var Payment = require('../models/payment');
var Ticket = require('../models/ticket');
var passport = require('passport');
var mongoose = require('mongoose');
var validator = require('express-validator');
var util = require('util');
var nodemailer = require('nodemailer');
var smtpConfig = require('../config/smtp-config.js');

"use strict";

var paypal = require('paypal-rest-sdk');
require('../config/pp-config.js');
var config = {};

/* GET home page. */
router.get('/', function(req, res, next) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
	Product.find({productType: { $ne: 'LITERATURE'}},function(err,docs) {
		productChunks = [];
		chunkSize = 4;
		for (var i = (4-chunkSize); i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize))
		}
		req.session.shopUrl = "/";
    	// res.render('shop/index', {
    	// 	title: 'MEAN Store', 
    	// 	products: productChunks,
    	// 	user: user
     //   	});
       	// res.render('shop/index', {products: productChunks,user: req.user, errorMsg: errorMsg,noErrorMsg:!errorMsg,successMsg: successMsg,noMessage:!successMsg});
       	 res.render('shop/shop', {
       	 	layout:'layout.hbs',
       	 	products: productChunks,
       	 	user: req.user, 
       	 	errorMsg: errorMsg,
       	 	noErrorMsg:!errorMsg,
       	 	successMsg: successMsg,
       	 	noMessage:!successMsg,
       	 	isLoggedIn:req.isAuthenticated()
       	 });
	});
});

router.post('/add-to-cart', function(req,res,next) {
	var successMsg = req.flash('success')[0];
	var ticket_name = req.body.ticket_name || null;
	var ticket_email = req.body.ticket_email || null;
	var errorMsg = req.flash('error')[0];
	var price = req.body.price || null;
	var type = req.body.type || null;
	var productId = req.body.productId || null;
	var shopUrl = req.session.shopUrl || '/';
	console.log("product id: " + productId);

	if (type=='TICKET') {
	   req.checkBody("ticket_email", "Enter a valid email address.").isEmail();
	}
	var errors = req.validationErrors();
	if (errors) {
	    returnObject = {  errorMsg: errors, noErrorMsg: false, noMessage: true};
	    req.flash('error','Invalid email address.  Please re-enter.');
	    console.log(returnObject);
	    return res.redirect(shopUrl);
	} 

	// var errors = req.validationErrors();
	// if (errors) {
	// 	errorMsg=req.flash('error','There have been validation errors: ' + util.inspect(errors), 400);
	// 	return res.redirect('/');
	// }

	var size = req.body.size || null;
	// if we have a cart, pass it - otherwise, pass an empty object
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	Product.findById(productId, function(err, product) {
		if (err) {
			// replace with err handling
			var errorMsg = req.flash('error','unable to find product');

			return res.redirect('/');
		}
		cart.add(product, product.id, price, size, ticket_name, ticket_email, type );
		req.session.cart = cart; // store cart in session
		req.flash('success','Item successfully added to cart.');
		res.redirect(shopUrl);
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
		res.render('shop/product',{layout:'fullpage.hbs',product: null, errorMsg: "Product not found.",noErrorMsg:0})

	});
});

router.get('/add-to-cart/:id/', function(req,res,next) {
	var shopUrl = req.session.shopUrl || "/";
	var productId = req.params.id;
	console.log(req.url);
	// if we have a cart, pass it - otherwise, pass an empty object
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			// replace with err handling
			return res.redirect('/');
		}
		cart.add(product, product.id, product.price);
		req.session.cart = cart; // store cart in session
		res.redirect(shopUrl);
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
			res.render('shop/shopping-cart',{products: null, errorMsg: "Product not found.",noErrorMsg:0})
		}
		cart.reduce(product, product.id, product.price);
		req.session.cart = cart; // store cart in session
		res.redirect('/shopping-cart');
	});
});

router.get('/shopping-cart', function(req, res, next) {
	errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
	if (!req.session.cart) {
		return res.render('shop/shopping-cart', { products: null, user: req.user});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, user: req.user, errorMsg: errorMsg,noErrorMsg:!errorMsg,successMsg: successMsg,noMessage:!successMsg});
})

router.get('/checkout', isLoggedIn, function(req,res, next) {
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
	var cart = new Cart(req.session.cart);
	var errorMsg = req.flash('error')[0];
	res.render('shop/checkout', {products: cart.generateArray(),totalPrice: cart.totalPrice.toFixed(2), user: req.user, successMsg: successMsg, noMessage: !successMsg, errorMsg, noErrorMsg:!errorMsg});
});

router.post('/checkout', function (req, res, next) {
	var method = req.body.method;
	var amount = parseFloat(req.body.amount);
	errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	products = cart.generateArray();
	var errorMsg = req.flash('error')[0];
	res.render('shop/checkout', {total: cart.totalPrice, successMsg: successMsg, noMessage: !successMsg, errorMsg, noErrorMsg:!errorMsg});
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

	if (!req.session.cart) {
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	products = cart.generateArray();
	var create_payment = {
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
			// if (products[i].type=="TICKET") {
			// 	item.ticket_name = products[i].ticket_name;
			// 	item.ticket_email = products[i].ticket_email;
			// }
			create_payment.transactions[0].item_list.items.push(item)
	}
	if (method === 'paypal') {
		create_payment.payer.payment_method = 'paypal';
		return_url = "http://" + req.headers.host + "/execute";
		cancel_url = "http://" + req.headers.host + "/cancel";
		create_payment.redirect_urls = {
			"return_url": return_url,
			"cancel_url": cancel_url
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
		create_payment.payer.payment_method = 'credit_card';
		create_payment.payer.funding_instruments = funding_instruments;
	}
//
// Send the payment request to paypal
// PP will respond with a payment record that includes a redirect url
// We'll store the payment in a document and then redirect the user
// When the user authorizes, paypal will callback our /execute route and we'll complete the transaction
//
	console.log(create_payment);
	paypal.payment.create(create_payment, function (err, payment) {
		if (err) {
			errorMsg = req.flash('error',"Error sending payment to paypal.");
			console.log('Payment not sent to paypal.' + err.message);
			res.redirect('/')
		} else {
			req.session.paymentId = payment.id;
			console.log(payment.id)
			var ourPayment = payment;
			ourPayment.user = req.user._id;
			var newPayment = new Payment(ourPayment);
			console.log(newPayment);
			newPayment.save(function(err, newpayment) {
				if (err) {
					errorMsg = req.flash('error',err.message);
					console.log('error: '+ err.message);
					return res.redirect('/shopping-cart');
				}
				// Create Order Record with a pending status.
				var order = new Order({
				    user: req.user,
				    cart: cart,
				    address: req.body.addr1,
				    city: req.body.city,
				    state: req.body.state,
				    zipcode: req.body.zipcode,
				    paymentId: payment.id,
				    status: 'pending'
				});
				order.save(function(err) {
					if (err) {
						req.flash('error','Unable to save order.');
						res.redirect('/');
					}
				})
				console.log('Payment ' + newPayment._id + ' successfully created.');
				var redirectUrl;
		 		if(payment.payer.payment_method === 'paypal') {
		 			var done = 0;
		 			for(var i=0; i < payment.links.length; i++) {
		 				done++;
		 				var link = payment.links[i];
		 				if (link.method === 'REDIRECT') {
		 					redirectUrl = link.href;
		 				}
		 				if (done==payment.links.length) {
		 					return res.redirect(redirectUrl);
		 				}
		 			}
		 		}
	 		});
		}
	});
});

router.get('/execute', function (req, res, next) {
	var paymentId = req.query.paymentId;
	var token = req.query.token;
	var PayerID = req.query.PayerID

	var details = { "payer_id": PayerID };
	var payment = paypal.payment.execute(paymentId, details, function (error, payment) {
		if (error) {
			console.log(error);
			res.render('error', { 'error': error });
		} else {
			// Update payment record with new state - should be approved.
			Payment.find({id: paymentId},function(err,paymentDocument) {
				if (err) {
					res.render('error',{'error': error});
				}
				Payment.update({id: paymentId},{state: payment.state}, function(err, numAffected) {
					if (err) {
						res.render('error', { 'error': err});
						exit();
					}
					console.log("Payment Record Updated with Payment State " + payment.state);
					Order.findOneAndUpdate({paymentId: payment.id},{status: payment.state},{new:true},function (err, newOrder) {
						if (err) {
							req.flash('error','Unable to save order.');
							return res.redirect('/');
						}
						User.findOneAndUpdate(
							{
								_id:req.user._id
							},{
								$push:{
									"orders": newOrder
								}
							},{
								new:true,
								safe: true,
								upsert: true
							},function(err,newUser) {
							if (err) {
								req.flash('error','Unable to update user record');
								return res.redirect('/');
							}
							var mailOptions = {
				                to: newUser.email,
				                from: 'techadmin@sepennaa.org',
				                subject: 'SEPIA Roundup Purchase',
				                text: 'We successfully processed an order with this email address.  If you have recieved this in error, please contact the SEPIA office at info@sepennaa.org.  Thank you for your order.\n\n' +
				                    'To review your purchase, please visit http://' + req.headers.host + '/user/profile/\n\n'
				            };
				            transporter.sendMail(mailOptions, function(err) {
				            });
				            
							console.log('User recorded updated');
						});
					});
			    });
			    var cart = new Cart(req.session.cart);
				products = cart.generateArray();
				req.flash('success', "Successfully processed payment!");
				var transporter = nodemailer.createTransport(smtpConfig.connectString);
	            tickets = cart.ticketSale(products,req.user._id);
				req.cart = null;
				var cart = new Cart({});
				req.session.cart = cart;

				res.redirect('/');
			})
			// res.render('shop/complete', { 'payment': payment, message: 'Problem Occurred' });
		}
	});
});

router.get('/complete', function(req, res, next) {
	var messages = req.flash('error');
	res.render('shop/paypal-test', {error: req.flash('error')[0]});
});

router.get('/cancel', function (req, res) {
	var paymentId = req.query.paymentId;
	var token = req.query.token;
	var PayerID = req.query.PayerID
	console.log(req.user);
	var details = { "payer_id": PayerID };
	Payment.update({id: paymentId},{state: payment.state}, function(err, numAffected) {
		if (err) {
			res.render('error', { 'error': err});
			exit();
		}
		successMsg = req.flash('success','Purchase Cancell');
		return res.render('/');
	});
});

router.post('/search', function(req, res, next) {
	var q = req.body.q;
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
	// Product.find({$text: { $search: q}}, function(err,docs) {


	Product.find(
        { $text : { $search : q } }, 
        { score : { $meta: "textScore" } }
    )
    .sort({ score : { $meta : 'textScore' } })
    .exec(function(err, results) {
		// count of all matching objects 
		if (err) {
			req.flash('error',"An error has occurred.");
			return res.redirect('/');
		}
		if (!results) {			
			req.flash('error',"No products found.");
			return res.redirect('/');
		}
		
		req.session.shopUrl = "/";
      	res.render('shop/books', {
       	 	layout:'books.hbs',
       	 	products: results,
       	 	user: req.user, 
       	 	errorMsg: errorMsg,
       	 	noErrorMsg:!errorMsg,
       	 	successMsg: successMsg,
       	 	noMessage:!successMsg,
       	 	isLoggedIn:req.isAuthenticated()
       	 });    });


});

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
