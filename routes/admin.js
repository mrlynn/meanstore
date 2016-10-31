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
	errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
    var tot = totalSales(function(err,next) {
    	if (err) {
    		console.log(err.message);
    		return res.error('err');
    	}
     	console.log('back with total ', tot);

    });
    Order.find({}, function(err, docs) {
        console.log("orders: " + docs);
        Product.find(function(err, products) {
            productChunks = [];
            chunkSize = 5;
            for (var i = (5 - chunkSize); i < products.length; i += chunkSize) {
                productChunks.push(docs.slice(i, i + chunkSize))
            }
            // res.render('shop/index', {
            // 	title: 'MEAN Store', 
            // 	products: productChunks,
            // 	user: user
            //   	});
            res.render('admin/index', {
                layout: 'admin.hbs',
                products: products,
                errorMsg: errorMsg,
                successMsg: successMsg,
                noErrorMsg: !errorMsg,
                noMessage: !successMsg,
                totalSales: tot,
                orders: docs,
                noErrors: 1
            });
        });
    });
});



/* GET home page. */
router.get('/products', function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0]
    var conditions = {
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
            req.session.shopUrl = "/books";
            res.render('admin/products', {
                layout: 'books.hbs',
           	 	csrfToken: req.csrfToken(),
                products: books,
                noMessage: !successMsg,
                noErrorMsg: !errorMsg,
                errorMsg: errorMsg,
                user: req.user, 
                isLoggedIn:req.isAuthenticated(),
                successMsg: successMsg
            });
        });
    });
});

router.get('/edit-product/:id', function(req, res, next) {
	productId = req.params.id;
	errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
	Product.findById(req.params.id, function(err, product) {
    	if (err) {
    		req.flash('error','Error: ' + err.message);
    		return res.redirect('/admin');
    	}
    	console.log("product: " + product);
    	res.render('admin/editProduct',{
    		product: product,
    		layout: 'fullpage.hbs',
    		product: product,
    		errorMsg: errorMsg,
    		successMsg: successMsg,
    		noErrorMsg: !errorMsg,
    		noMessage: !successMsg

    	})
    });
})

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
