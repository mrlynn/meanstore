var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
// Mindspace meanstack cart tutorial
//https://www.youtube.com/watch?v=GHNLWHGCBEc
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
	console.log("Checking");
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
        errors.forEach(function(error) {
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
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'Email is already in use.'
            });
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
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            console.log('User successfully registered');
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'email': email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Invalid credentials.'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Invalid credentials.'
            });
        }
        return done(null, user);
    });
}));
