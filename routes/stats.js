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
