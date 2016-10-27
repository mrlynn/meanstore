var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart');

var csrfProtection = csrf();
router.use(csrfProtection);


router.get('/profile', isLoggedIn, function(req,res,next) {
	Order.find('{user: req.user}', function(err, orders) {
		if (err) {
			return res.write('Error');
		}
		var cart;
		orders.forEach(function(order) {
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		res.render('user/profile', {user: req.user, orders: orders});
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
	res.render('user/signup', {csrfToken: req.csrfToken(), message: messages, hasErrors: messages.length > 0});
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
	res.render('user/signin', {csrfToken: req.csrfToken(), message: messages, hasErrors: messages.length > 0});
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
