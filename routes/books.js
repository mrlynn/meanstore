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
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0]
    var conditions = {
        category: {
            $ne: 'Round-up'
        }
    }
    Product.find(conditions, function(err, books) {
        if (err) {
            req.flash('error','Error while retrieving products.');
            return res.redirect('/books');
        }
        console.log("orders: " + books);
        Product.find(function(err, books) {
            // productChunks = [];
            // chunkSize = 5;
            // for (var i = (5 - chunkSize); i < books.length; i += chunkSize) {
            //     productChunks.push(books.slice(i, i + chunkSize))
            // }
            // res.render('shop/index', {
            // 	title: 'MEAN Store', 
            // 	products: productChunks,
            // 	user: user
            //   	});
            res.render('shop/books', {
                layout: 'books.hbs',
                products: books,
                noMessage: !successMsg,
                noErrorMsg: !errorMsg,
                errorMsg: errorMsg,
                successMsg: successMsg
            });
        });
    });
});

router.get('/orders', function(req, res, next) {
	res.render('admin/orders',{layout: "adminPage"});
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
        res.render('admin/index', {
            products: productChunks,
            noErrors: 1
        });
    })
});

module.exports = router;

var totalSales = function() {
    Order.aggregate({
        $match: {
            "status": "approved"
        }
    }, {
        $group: {
            _id: null,
            'Total': {
                $sum: '$cart.totalPrice'
            }
        }
    }, function(err, doc) {
    	if (err) {
    		console.log("err: " + err.message);
    	}
        console.log('Total ', doc[0].Total);
		return doc;

    });
}
