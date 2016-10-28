var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
var passport = require('passport');
var mongoose = require('mongoose');
var csrf = require('csurf');
var User = require('../models/user');
var Payment = require('../models/payment');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
	var totalTickets = totalTicketsSold();
	console.log("Total Tickets " + totalTickets);
	Product.find(function(err,docs) {
		productChunks = [];
		chunkSize = 5;
		for (var i = (5-chunkSize); i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize))
		}
    	// res.render('shop/index', {
    	// 	title: 'MEAN Store', 
    	// 	products: productChunks,
    	// 	user: user
        //   	});
       	res.render('admin/index', {layout: 'admin.hbs',products: productChunks, noErrors:1});

	});
});

router.post('/product/:id', function(req, res, next) {
	productID = req.params.id;
	Product.findById(req.params.id, function(err, product) {
		product.title = req.body.title;
		product.description = req.body.description;
		product.price = req.body.price;
		product.type = req.body.price;
		product.updated = Date.now();
		product.imagePath = req.body.imagePath;
	});
	product.save(function(err) {
		if (!err) {
			console.log("updated");
		} else {
			console.log(err);
		}
       	res.render('admin/index', {products: productChunks, noErrors:1});
	})
});

router.get('/product/:id', function(req, res, next) {
	productID = req.params.id;

	Product.findById(productID,function(err,product) {
		if (!err) {
			res.render('admin/product',{product: product});
		}
	})

	res.render

});

module.exports = router;

var getBalance = function(req,res,next) {
    Payment.aggregate([
        { $unwind: "$transactions" },
        { $group: {
            _id: "$_id",
            amount: { $sum: "$records.amount"  }
        }}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}
var totalTicketsSold = function(req, res, next) {
	return 99;
}
var totalSales = function(req, res, next) {
	Payments.find({},function(err,payments) {
		req.totalSales
	})
	if (req.isAuthenticated()) {
		return next();
	}
	req.session.oldUrl = req.url;
	res.redirect('/user/signin');	
}