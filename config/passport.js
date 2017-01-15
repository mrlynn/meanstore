var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');

const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// dotenv.load({ path: '.env.hackathon' });

// Mindspace meanstack cart tutorial
//https://www.youtube.com/watch?v=GHNLWHGCBEc
passport.serializeUser(function (user, done) {
	done(null, user.id);
}); 

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function (req, email, password, done) {
	process.nextTick(function () {
    console.log("Here...");
		req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
		req.checkBody('password', 'Invalid Password').notEmpty().isLength({
			min: 4
		});
		req.checkBody('password', 'Invalid Password').notEmpty().isLength({
			min: 4
		});
		req.checkBody('first_name', 'Invalid First Name').notEmpty().isLength({
			min: 1
		});
		req.checkBody('last_name', 'Invalid Last Name').notEmpty().isLength({
			min: 1
		});
		req.checkBody('addr1', 'Invalid Address').notEmpty().isLength({
			min: 4
		});
		req.checkBody('city', 'Invalid City').notEmpty().isLength({
			min: 4
		});
		req.checkBody('state', 'Invalid State').notEmpty().isLength({
			min: 2
		});
		req.checkBody('zipcode', 'Invalid Zipcode').notEmpty().isLength({
			min: 2
		});
		var errors = req.validationErrors();
		if (errors) {
			var messages = [];
			errors.forEach(function (error) {
				messages.push(error.msg);
			});
			if (req.body.password != req.body.verifypassword) {
				msg = 'Password and Verification do not match.';
				messages.push(msg);
			}
			return done(null, false, req.flash('error', messages));
		}
		User.findOne({
			'email': email
		}, function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
        console.log("User email exists.");
				return done(null, false, req.flash('error', 'Email is already in use.'));
			}
			var newUser = new User();
			newUser.email = email;
			// newUser.password = newUser.encryptPassword(password);
			newUser.password = req.body.password;
			newUser.first_name = req.body.first_name;
			newUser.last_name = req.body.last_name;
			newUser.addr1 = req.body.addr1;
			newUser.addr2 = req.body.addr2;
			newUser.city = req.body.city;
			newUser.state = req.body.state;
			newUser.zipcode = req.body.zipcode;
			newUser.telephone = req.body.telephone;
			newUser.role = 'visitor';
			newUser.save(function (err, result) {
				if (err) {
					return done(err);
				}
				console.log('User successfully registered');
				req.flash('success', 'User successfully registered.');
				return done(null, newUser);
			});
		});
	})

}));

passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function (req, email, password, done) {
	req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
	req.checkBody('password', 'Invalid Password').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach(function (error) {
			messages.push(error.msg);
		});
		return done(null, false, messages);
	}
  console.log("In passport");
	User.findOne({
		'email': email
	}, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false,
				req.flash('error', 'Invalid credentials')
			);
		}
		if (!user.validPassword(password)) {
			return done(null, false,
				req.flash('error', 'Invalid credentials'));
		}
		return done(null, user);
	});
}));

passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_ID,
	clientSecret: process.env.FACEBOOK_SECRET,
	callbackURL: '/user/facebook/callback',
	profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
	passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
	if (req.user) {
		User.findOne({
			facebook: profile.id
		}, (err, existingUser) => {
			if (err) {
				console.log("Problem fetching user.");
				return done(err);
			}
			if (existingUser) {
				console.log("Existing User");
				req.flash('error', 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.');
				done(err);
			} else {
				console.log("Not Existing User");

				User.findById(req.user.id, (err, user) => {
					if (err) {
						console.log("Problem fetching user.");
						return done(err);
					}
					user.facebook = profile.id;
					user.tokens.push({
						kind: 'facebook',
						accessToken
					});
					user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
					user.first_name = user.first_name || `${profile.name.givenName}`;
					user.last_name = user.last_name || `${profile.name.familyName}`;
					user.role = user.role || "visitor";
					user.profile.gender = user.profile.gender || profile._json.gender;
					user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
					user.save((err) => {
						if (err) {
							console.log("Problem linking facebook to user.");
						}
						req.flash('success', {
							msg: 'Facebook account has been linked.'
						});
						done(err, user);
					});
				});
			}
		});
	} else {
		User.findOne({
			facebook: profile.id
		}, (err, existingUser) => {
			if (err) {
				console.log("Problem fetching user.");
				return done(err);
			}
			if (existingUser) {
				console.log("Existing user.");
				return done(null, existingUser);
			}
			User.findOne({
				email: profile._json.email
			}, (err, existingEmailUser) => {
				if (err) {
					console.log("Problem fetching user.");
					return done(err);
				}
				if (existingEmailUser) {
					console.log('There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.');
					req.flash('error', 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.');
					done('There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.');
				} else {
					const user = new User();
					user.email = profile._json.email;
					user.facebook = profile.id;
					user.tokens.push({
						kind: 'facebook',
						accessToken
					});
					user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
					user.first_name = user.first_name || `${profile.name.givenName}`;
					user.last_name = user.last_name || `${profile.name.familyName}`;
					user.role = user.role || "visitor";
					user.profile.gender = profile._json.gender;
					user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
					user.profile.location = (profile._json.location) ? profile._json.location.name : '';
					user.save((err) => {
						done(err, user);
					});
				}
			});
		});
	}
}));

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURL: '/user/google/callback',
	passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
	if (req.user) {
		User.findOne({
			google: profile.id
		}, (err, existingUser) => {
			if (err) {
				return done(err);
			}
			if (existingUser) {
				req.flash('error', {
					msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
				});
				done(err);
			} else {
				User.findById(req.user.id, (err, user) => {
					if (err) {
						return done(err);
					}
					user.google = profile.id;
					user.role = 'visitor';
					user.tokens.push({
						kind: 'google',
						accessToken
					});
					user.profile.first_name = user.profile.first_name || profile.displayName;
					user.profile.gender = user.profile.gender || profile._json.gender;
					user.profile.picture = user.profile.picture || profile._json.image.url;
					user.first_name = user.first_name || profile.name.givenName;
					user.last_name = user.last_name || profile.name.familyName;
					user.save((err) => {
						req.flash('info', 'Google account has been linked.');
						done(err, user);
					});
				});
			}
		});
	} else {
		User.findOne({
			google: profile.id
		}, (err, existingUser) => {
			if (err) {
				return done(err);
			}
			if (existingUser) {
				return done(null, existingUser);
			}
			User.findOne({
				email: profile.emails[0].value
			}, (err, existingEmailUser) => {
				if (err) {
					return done(err);
				}
				if (existingEmailUser) {
					req.flash('error', 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.');
					done(err);
				} else {
					const user = new User();
					user.email = profile.emails[0].value;
					user.role = 'visitor';
					user.google = profile.id;
					user.tokens.push({
						kind: 'google',
						accessToken
					});
					user.profile.first_name = profile.displayName;
					user.profile.gender = profile._json.gender;
					user.first_name = user.first_name || profile.name.givenName;
					user.last_name = user.last_name || profile.name.familyName;
					user.profile.picture = profile._json.image.url;

					user.save((err) => {
						done(err, user);
					});
				}
			});
		});
	}
}));
