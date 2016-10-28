var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');
var Payment = require('../models/payment');
var Order = require('../models/order');
var Cart = require('../models/cart');
var ObjectId = require('mongoose').Types.ObjectId; 
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req,res,next) {
	payments = {};
	console.log(req.user._id);
	Payment.find({}, function(err,payments) {
		if (err) {
			console.log('err:' + err);
			return res.write('Error');
		}
	});
	// console.log(payments);
	// res.render('user/profile', {layout:'fullpage.hbs',user: req.user, payments: payments,hasPayments:0});

	Order.find('{user: req.user, status: "approved"}', function(err, orders) {
		if (err) {
			return res.write('Error');
		}
		var cart;
		orders.forEach(function(order) {
			Payment.find({id:order.paymentId},function(err,paymentDoc) {
				console.log("Payment " + paymentDoc.state);
				console.log("Order " + order.status);
				if (paymentDoc.state != order.status) {
					order.status = "Payment not completed.";
				}
			});
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		res.render('user/profile', {layout:'fullpage.hbs',user: req.user, orders: orders, payments: payments,hasPayments:1});
	});
});
router.get('/logout', isLoggedIn, function(req,res,next) {
	req.session.destroy()
	req.logout();
	res.redirect('/');
});

router.use('/', notLoggedIn, function(req,res,next) {
	next();
});

router.get('/signup', function(req,res,next) {
	var messages = req.flash('error');
	res.render('user/signup', {layout: 'fullpage.hbs', csrfToken: req.csrfToken(), message: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/user/profile',
	failureRedirect: '/user/signup',
	failureFlash: true
}), function(req, res, next) {
	if(req.session.oldUrl) {
		var oldUrl = req.session.oldUrl
		req.session.oldUrl = null;
		res.redirect(oldUrl);
	} else {
		res.redirect('/user/profile');
	}
});

router.get('/signin', function(req,res,next) {
	var messages = req.flash('error');
	res.render('user/signin', {layout: 'fullpage.hbs',csrfToken: req.csrfToken(), message: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
	failureRedirect: '/user/signin',
	failureFlash: true
}), function(req, res, next) {
	if(req.session.oldUrl) {
		var oldUrl = req.session.oldUrl
		req.session.oldUrl = null;
		res.redirect(oldUrl);
	} else {
		res.render('user/profile',{user: req.user});
	}
});

module.exports = router;

// Mindspace
// https://www.youtube.com/watch?v=XVYApTfR6XE

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
