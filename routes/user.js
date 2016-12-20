var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');
var passportFacebook = require( 'passport-facebook' );
var passportTwitter = require( 'passport-twitter' );
var User = require('../models/user');
var Payment = require('../models/payment');
var Order = require('../models/order');
var Cart = require('../models/cart');
var ObjectId = require('mongoose').Types.ObjectId;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var meanlogger = require('../local_modules/meanlogger');

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

    Order.find({$and: [{user: req.user}, {status: "approved"}]}, function(err, orders) {
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
    meanlogger.log("key","logged out",req.user);

    req.session.destroy()
    req.logout();
    res.redirect('/');
});

router.get('/forgot', function(req, res, next) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
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
                    return res.redirect('/user/forgot');
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                	if (err) {
                		req.flash('error','An error occurred.');
                	}
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
	                 req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
				   	 res.redirect('/user/forgot');
			   	} else {
			   		 req.flash('error', 'A problem has occurred while sending the email.');
				   	 return res.redirect('/user/forgot');
			   	}
            });
        }
    ], function(err) {
        if (err) {
        	req.flash('error','A problem has occurred ' + err);
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
	pass = req.body.password;
	conf = req.body.confirmation;
	token = req.params.token;
	if (pass != conf) {
		req.flash('error', 'Email and confirmation do not match.');
		res.redirect('/user/reset/'+token);
	}
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
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ],function(err) {
  		if (err) {
  			req.flash('error','Unknown Error during reset.')
  			res.redirect('user/reset');
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
    meanlogger.log("key","signup attempt",req.user);
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

router.get('/signin', function(req, res, next) {
    req.session.oldUrl = req.get('referer');
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
    console.log("Referer: " + req.get('Referer'));
    meanlogger.log("key","logged in",req.user);
    if (req.session.oldUrl && (req.session.oldUrl != req.url)) {
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        User.findOne({_id: req.user._id}, function(err,user) {
            user.lastlogin=Date.now();
            user.save(function(err,docs) {
                if (err) {
                    console.log("Unable to save user.");
                }
            })
            res.render('user/profile', {
                user: req.user
            });
        })

    }
});

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_location']
}));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/signin' }), (req, res) => {
    res.redirect(req.session.returnTo || '/');
});

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/signin' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
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
