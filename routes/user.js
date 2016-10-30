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
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var smtpConfig = require('../config/smtp-config.js');

var csrfProtection = csrf();

router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    payments = {};
    console.log(req.user._id);
    Payment.find({}, function(err, payments) {
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
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {
            layout: 'fullpage.hbs',
            user: req.user,
            orders: orders,
            hasPayments: 1
        });
    });
});
router.get('/logout', isLoggedIn, function(req, res, next) {
    req.session.destroy()
    req.logout();
    res.redirect('/');
});

router.get('/forgot', function(req, res, next) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
	errorMsg = 0;
	successMsg = 0;
   	 res.render('user/forgot', {
   	 	layout:'fullpage.hbs',
   	 	user: req.user, 
   	 	errorMsg: errorMsg,
   	 	noErrorMsg:!errorMsg,
   	 	successMsg: successMsg,
   	 	noMessage:!successMsg,
   	 	isLoggedIn:req.isAuthenticated(),
   	 	csrfToken: req.csrfToken()
   	 });
});

router.post('/forgot', function(req, res, next) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
	async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({
                email: req.body.email
            }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    console.log('no account with that email.');
                    return res.render('user/forgot', {
				   	 	layout:'fullpage.hbs',
				   	 	user: req.user, 
				   	 	errorMsg:"foo",
				   	 	noErrorMsg:!errorMsg,
				   	 	successMsg:successMsg,
				   	 	noMessage:!successMsg,
				   	 	isLoggedIn:req.isAuthenticated(),
				   	 	csrfToken: req.csrfToken()
				   	 });
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            // // var smtpTransport = nodemailer.createTransport('SMTP', {
            //   service: 'SendGrid',
            //   auth: {
            //     user: '!!! YOUR SENDGRID USERNAME !!!',
            //     pass: '!!! YOUR SENDGRID PASSWORD !!!'
            //   }
            // });
            //
            // var smtpConfig = {
            //     host: 'smtp.gmail.com',
            //     port: 465,
            //     secure: true, // use SSL 
            //     auth: {
            //         user: 'you@yourmail.org',
            //         pass: 'yourpassword!'
            //     }
            // };
            var transporter = nodemailer.createTransport(smtpConfig.connectString);
            var mailOptions = {
                to: user.email,
                from: 'techadmin@sepennaa.org',
                subject: 'SEPIA Roundup Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/user/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function(err) {
            	 if (!err) { 
	                 successMsg = req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
				   	 res.render('user/forgot', {
				   	 	layout:'fullpage.hbs',
				   	 	user: req.user, 
				   	 	errorMsg: errorMsg,
				   	 	noErrorMsg:!errorMsg,
				   	 	successMsg: successMsg,
				   	 	noMessage:!successMsg,
				   	 	isLoggedIn:req.isAuthenticated(),
				   	 	csrfToken: req.csrfToken()
				   	 });
			   	} else {
			   		 errorMsg = 'test'; //req.flash('error', 'A problem has occurred while sending the email.');
				   	 res.render('user/forgot', {
				   	 	layout:'fullpage.hbs',
				   	 	user: req.user, 
				   	 	errorMsg: errorMsg,
				   	 	noErrorMsg:!errorMsg,
				   	 	successMsg: successMsg,
				   	 	noMessage:!successMsg,
				   	 	isLoggedIn:req.isAuthenticated(),
				   	 	csrfToken: req.csrfToken()
				   	 });
			   	}
            });
        }
    ], function(err) {
        if (err) {
        	// errorMsg = req.flash('error','A problem has occurred ' + err);
        	 errorMsg = 'teststs'
        	return next(err);
        }
        res.redirect('/user/forgot');
    });
});

router.get('/reset/:token', function(req, res) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      errorMsg = req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/user/forgot');
    }
    res.render('user/reset', {
      user: req.user,
      	token:req.params.token,
    	errorMsg: errorMsg,
   	 	noErrorMsg:!errorMsg,
   	 	successMsg: successMsg,
   	 	csrfToken: req.csrfToken(),
   	 	noMessage:!successMsg,
    });
  });
});

router.post('/reset/:token', function(req, res) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          errorMsg = req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport(smtpConfig.connectString);

      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        successMsg = req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ],function(err) {
  		if (err) {
  			errorMsg = req.flash('error','Unknown Error during reset.')
  			res.render('user/reset', {
		        user: req.user,
		    	errorMsg: errorMsg,
		   	 	noErrorMsg:!errorMsg,
		   	 	successMsg: successMsg,
		   	 	csrfToken: req.csrfToken(),
		   	 	noMessage:!successMsg,
		    });
		}
    });
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        layout: 'fullpage.hbs',
        csrfToken: req.csrfToken(),
        message: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        layout: 'fullpage.hbs',
        csrfToken: req.csrfToken(),
        message: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.render('user/profile', {
            user: req.user
        });
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
