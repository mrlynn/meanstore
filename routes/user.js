var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var flash = require('connect-flash');
var passport = require('passport');
var passportFacebook = require( 'passport-facebook' );
var passportTwitter = require( 'passport-twitter' );
var User = require('../models/user');
var Payment = require('../models/payment');
var Order = require('../models/order');
var Cart = require('../models/cart');
var ObjectId = require('mongoose').Types.ObjectId;
var validator = require('express-validator');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var meanlogger = require('../local_modules/meanlogger');
const dotenv = require('dotenv');
const chalk = require('chalk');

// dotenv.load({
//     path: '.env.hackathon'
// });
var csrfProtection = csrf({ cookie: true })

var smtpConfig = require('../config/smtp-config.js');

router.post('/update-profile', csrfProtection, function(req,res,next) {
    req.checkBody('sober_date', 'Invalid date').optional({ checkFalsy: true }).isDate();
    var errors = req.validationErrors();
    if (errors) {
        req.flash('error','Invalid date entered for Sobriety date.  Please use mm/dd/yyyy format.');
        return res.redirect('/user/profile');
    }
    User.update({_id: req.user._id}, req.body)
        .then(function (err, user) {
            req.user = user;
            req.flash('success','User Updated');
            res.redirect('/user/profile');
        })
        .catch(function (err) {
            console.log("Error: " + JSON.stringify(err));
            req.flash('error','Problem updating user profile.');
            res.redirect('/user/profile');
            res.status(400).send(err);
    });
});

router.get('/profile', isLoggedIn, csrfProtection, function(req, res, next) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
    res.render('user/profile', {
        layout: 'eshop/blank',
        user: req.user,
        errorMsg: errorMsg,
        noErrorMsg: !errorMsg,
        successMsg: successMsg,
        noMessage: !successMsg,
        csrfToken: req.csrfToken()
    });
});
router.get('/orders', isLoggedIn, function(req, res, next) {

    // console.log(payments);
    // res.render('user/profile', {layout:'fullpage.hbs',user: req.user, payments: payments,hasPayments:0});

    Order.find({$or: [{user: req.user._id}, { "user.email": req.user.email}]},null,{sort: {created: -1}}, function(err, orders) {
        if (err) {
            return res.write('Error');
        }
        var arr = [];
        // for (var order in orders) {
        //     console.log("Cart Item: " + orders[order]);
        //     console.log("------------");
        //     for (var item in orders[order].cart.items) {
        //         console.log("Item " + item);
        //         console.log(orders[order].cart.items[item].item.name);
        //
        //     }
        // }
        // return arr;
        res.render('user/orders', {
            layout: 'eshop/blank',
            user: req.user,
            orders: orders,
        });
    });
});
router.get('/logout', isLoggedIn, function(req, res, next) {
    meanlogger.log("auth","logged out",req.user);

    req.session.destroy()
    req.logout();
    res.redirect('/');
});

router.get('/logout-and-delete', isLoggedIn, function(req, res, next) {
    meanlogger.log("auth","logged out and deleted account",req.user);
    User.findByIdAndRemove(req.user._id, function(err,result) {
        if (err) {
            console.log("Problem removing user record.");
            req.flash('error','Unable to delete user record.');
            res.redirect('/');
        }
        req.flash('success','User record deleted and logged out.');
    })
    //req.session.destroy()
    req.logout();
    res.redirect('/');
});

router.get('/forgot', function(req, res, next) {
	var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
	res.render('user/forgot', {
		layout:'eshop/blank',
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
    var successMsg = req.flash('success')[0];
	var errorMsg = req.flash('error')[0];
    console.log("MEssages: " + JSON.stringify(messages));
    res.render('user/signup', {
        layout: 'eshop/blank',
        //csrfToken: req.csrfToken(),
        "successMsg": successMsg,
        "noMessage": !successMsg,
        "message": messages,
        "errorMsg": messages[0],
        "noErrorMsg": !messages,
    });
});


router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next) {
    meanlogger.log("auth","signup attempt",req.user);
    console.log("BACK FROM SIGNUP");
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

router.get('/signin', csrfProtection, function(req, res, next) {
    var successMsg = req.flash('success')[0];
    var errorMsg = req.flash('error')[0];
    if (process.env.FACEBOOK_ID) {
        var authFacebook = true
    } else {
        var authFacebook = false;
    }
    if (process.env.GOOGLE_ID) {
        var authGoogle = true;
    } else {
        var authGoogle = false;
    }
    req.session.oldUrl = req.get('referer');
    var messages = req.flash('error');
    res.render('user/signin', {
        layout: 'eshop/blank',
        // csrfToken: req.csrfToken(),
        authFacebook: authFacebook,
        authGoogle: authGoogle,
        noErrorMessage: !errorMsg,
        message: messages,
        noErrorMsg: !errorMsg,
        successMsg: successMsg,
        noMessage: !successMsg,
        hasErrors: messages.length > 0
    });
});

// router.post('/signin', passport.authenticate('local.signin', {
//     failureRedirect: '/user/signin',
//     failureMessage: "Invalid username or password",
//     failureFlash: true
// }), function(req, res, next) {
//     console.log("REQ: " + JSON.stringify(req));
//     meanlogger.log("auth","logged in",req.user);
//     if (req.session.oldUrl && (req.session.oldUrl != req.url)) {
//         var oldUrl = req.session.oldUrl
//         req.session.oldUrl = null;
//         res.redirect(oldUrl);
//     } else {
//         User.findOne({_id: req.user._id}, function(err,user) {
//             user.lastlogin=Date.now();
//             user.save(function(err,docs) {
//                 if (err) {
//                     console.log("Unable to save user.");
//                 }
//             })
//             res.render('user/profile', {
//                 user: req.user
//             });
//         })
//     }
// });

router.post('/signin', function(req, res, next) {
    passport.authenticate('local.signin', {session : true},
    function(err, user, info) {
        if (err) {
            req.flash('error','Internal Server Error');
            return res.redirect('/user/signin');
        } else if (!user) {
            req.flash('error','Invalid credentials');
            return res.redirect('/user/signin');
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash('error','Invalid credentials');
                return res.redirect('/user/signin');
            }
            req.flash('success','Logged In Successfully');
            return res.redirect('/user/profile');
        });
    })(req, res, next);
});


router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    failureFlash: true
}));

// router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/user/signin' }), (req, res) => {
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect(req.session.returnTo || '/');
});

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/user/signin' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/signin' }), (req, res) => {
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
