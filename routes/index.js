var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Category = require('../models/category');
var Product = require('../models/product');
var Purchase = require('../models/purchase');
var Order = require('../models/order');
var User = require('../models/user');
var Payment = require('../models/payment');
var Ticket = require('../models/ticket');
var passport = require('passport');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var validator = require('express-validator');
var util = require('util');
var nodemailer = require('nodemailer');
var smtpConfig = require('../config/smtp-config.js');
var taxCalc = require('../local_modules/tax-calculator');
var shippingCalc = require('../local_modules/shipping-calculator');
var taxConfig = require('../config/tax-config.js');
var recommendations = require('../local_modules/recommendations');
var Config = require('../config/config.js');
const dotenv = require('dotenv');
const chalk = require('chalk');
var meanlogger = require('../local_modules/meanlogger');

dotenv.load({
    path: '.env.hackathon'
});

var title = Config.title;

var fs = require('fs');

"use strict";

var useFacets = (process.env.facets === true);
var viewTour = (process.env.viewTour === true);
useFacets = true;
var frontPageCategory = process.env.frontPageCategory;
var viewDocuments = process.env.viewDocuments;

if (useFacets == true) {
    shopPage = 'shop/facet';
    shopLayout = 'facet.hbs';
} else {
    shopPage = 'shop/shop';
    shopLayout = 'layout.hbs';
}
var paypal = require('paypal-rest-sdk');
require('../config/pp-config.js');
var config = {};

/* PayPal Info Page */
router.get('/whypaypal', function(req, res, next) {
    res.render('shop/whypaypal');
});
router.get('/overview', function(req, res, next) {
        categoryrecord = {
            "_id": "ObjectId('58485813edf44d95fb117223')",
            "name": "Television",
            "slug": "Television",
            "attributes": [],
            "ancestors": [],
            "__v": 0
        };
        orderrecord = {
            "_id": "ObjectId('5825f1bce3c20070202ee287')",
            "user": "ObjectId('5825d55ba32a1c41e7ce321c')",
            "cart": {
                "items": {
                    "5825d1870ec3cd4d15d0d9c8": {
                        "item": {
                            "_id": "5825d1870ec3cd4d15d0d9c8",
                            "code": "cam1002",
                            "name": "Generic Granite Keyboard Camera",
                            "title": "Lumix Practical plum Generic Granite Keyboard Camera",
                            "description": "Maxime aspernatur vitae officia alias rerum provident et voluptas.",
                            "taxable": true,
                            "shipable": true,
                            "price": 10200,
                            "Product_Group": "Camera",
                            "category": "Camera",
                            "imagePath": "/img/lumix-camera.jpg",
                            "__v": 0,
                            "salesYearMonth": [],
                            "salesYTD": [],
                            "categories": [],
                            "update": "2016-11-11T14:11:18.773Z",
                            "created": "2016-11-11T14:11:18.773Z",
                            "options": [],
                            "Attributes": [{
                                "Name": "color",
                                "Value": "plum",
                                "_id": "5825d1870ec3cd4d15d0d9cf"
                            }, {
                                "Name": "brand",
                                "Value": "Lumix",
                                "_id": "5825d1870ec3cd4d15d0d9ce"
                            }, {
                                "Name": "Memory Card Type",
                                "Value": "SD",
                                "_id": "5825d1870ec3cd4d15d0d9cd"
                            }, {
                                "Name": "Image Resolution",
                                "Value": "29 Megapixels",
                                "_id": "5825d1870ec3cd4d15d0d9cc"
                            }, {
                                "Name": "Video Resolution",
                                "Value": "8k",
                                "_id": "5825d1870ec3cd4d15d0d9cb"
                            }, {
                                "Name": "Optical Zoom",
                                "Value": "23mm",
                                "_id": "5825d1870ec3cd4d15d0d9ca"
                            }, {
                                "Name": "Price",
                                "Value": "102.00",
                                "_id": "5825d1870ec3cd4d15d0d9c9"
                            }]
                        },
                        "qty": 1,
                        "price": 102,
                        "size": 0,
                        "taxAmount": 0,
                        "taxable": "Yes",
                        "shipable": "Yes",
                        "itemTotal": "102.00"
                    }
                },
                "totalQty": 1,
                "totalTax": 0,
                "totalShipping": 0,
                "totalPrice": 102,
                "grandTotal": 102,
                "totalPriceWithTax": 0
            },
            "address": "123 Main St.",
            "city": "Anywhere",
            "state": "PA",
            "paymentId": "PAY-8E858244005728329LAS7DPA",
            "status": "approved",
            "created": "ISODate('2016-11-11T16:28:44.943Z')",
            "__v": 0
        };
        userrecord = {
            _id: '5829d84b9304197fdc58a918',
            role: 'visitor',
            zipcode: '19147',
            state: 'PA',
            city: 'Philadelphia',
            addr1: '123 S. Main St.',
            last_name: 'Smith',
            first_name: 'Samantha',
            password: '$2a$05$oiamsitnqzD6wG.nghAbceS0eQL3YMccqTq6AVxh7XGJijp5Jm5Zy',
            email: 'blahblahblah@gmail.com',
            __v: 0,
            orders: [],
            purchased: ['5829d84b9304197fdc58a918', '6829d84b4309197fdc58a3jk'],
            likes: ['5829d84b9304197fdc58a918', '6829d84b4309197fdc58a3jk'],
            created: 'Mon Nov 14 2016 10:28:37 GMT-0500 (EST)'
        };
        Product.findOne({}, function(err, doc) {
            if (err) {
                console.log("Problem fetching one random record.");
            }
            console.log("doc " + doc);
            res.render('overview', {
                layout: 'overview.hbs',
                user: JSON.stringify(userrecord),
                product: doc,
                order: JSON.stringify(orderrecord)
            });
        });
    })
    /* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg = req.flash('success')[0];
    var errorMsg = req.flash('error')[0];
    var tutorial = req.params.tutorial;
    if (tutorial==1) {
        req.session.tutorial = true;
    } else {
        req.session.tutorial = false;
    }
    var categoryrecord = {
        "_id": "ObjectId('58485813edf44d95fb117223')",
        "name": "Television",
        "slug": "Television",
        "attributes": [],
        "ancestors": [],
        "__v": 0
    };
    Category.find({},function(err, navcats) {
        Product.aggregate([{
            $sortByCount: "$category"
        }], function(err, allcats) {
            if (frontPageCategory) {
                categCondition = {
                    category: frontPageCategory
                };
            } else {
                categCondition = {};
            }
            Product.find(categCondition, function(err, docs) {
                productChunks = [];
                productJSON = [];
                chunkSize = 4;
                for (var i = (4 - chunkSize); i < docs.length; i += chunkSize) {
                    productChunks.push(docs.slice(i, i + chunkSize));
                }
                res.render(shopPage, {
                    layout: shopLayout,
                    title: title,
                    categoryrecord: JSON.stringify(categoryrecord),
                    showRecommendations: eval(res.locals.showRecommendations),
                    allcategories: res.locals.allcategories,
                    keywords: Config.keywords,
                    products: productChunks,
                    user: req.user,
                    allcats: allcats,
                    navcats: navcats,
                    errorMsg: errorMsg,
                    noErrorMsg: !errorMsg,
                    successMsg: successMsg,
                    viewDocuments: viewDocuments,
                    tutorial: tutorial,
                    noMessage: !successMsg,
                    viewTour: viewTour,
                    isLoggedIn: req.isAuthenticated()
                });
            });
        });
    });
});

/* GET home page. */
router.get('/category/:slug', function(req, res, next) {
    var category_slug = req.params.slug;
    var q = req.query.q;
    var successMsg = req.flash('success')[0];
    var errorMsg = req.flash('error')[0];
    Product.aggregate([{
        $match: {
            $text: {
                $search: q
            }
        }
    }, {
        $sortByCount: "$category"
    }], function(err, allcats) {
        Product.aggregate([{
            $match: {
                "category": category_slug
            }
        }, {
            $unwind: "$Attributes"
        }, {
            $bucketAuto: {
                groupBy: "$Attributes.Value",
                buckets: 6
            }
        }], function(err, aggout) {
            if (err) {
                req.flash('error', 'Problem ' + err.message);
                return res.redirect('/');
            }
            Category.findOne({
                slug: new RegExp(category_slug, 'i')
            }, function(err, category) {
                if (err) {
                    req.flash('error', 'Cannot find category');
                    return res.redirect('/');
                }
                if (!category) {
                    req.flash('error', 'Cannot find category');
                    return res.redirect('/');
                }
                Product.find({
                    $or: [{
                        'category': new RegExp(category.slug, 'i')
                    }, {
                        'category': new RegExp(category.name, 'i')
                    }]
                }, function(err, products) {
                    if (category.format!='table') {
                        productChunks = [];
                        chunkSize = 4;
                        for (var i = (4 - chunkSize); i < products.length; i += chunkSize) {
                            productChunks.push(products.slice(i, i + chunkSize))
                        };
                        products = productChunks
                    }
                    res.render('shop/category', {
                        layout: 'books',
                        allcats: allcats,
                        viewDocuments: viewDocuments,
                        category: category,
                        products: products,
                        productChunks: productChunks,
                        user: req.user,
                        q: q,
                        errorMsg: errorMsg,
                        noErrorMsg: !errorMsg,
                        successMsg: successMsg,
                        noMessage: !successMsg,
                        aggout: aggout,
                        isLoggedIn: req.isAuthenticated()
                    });
                });
            });
        });
    })

});

router.post('/add-to-cart', isLoggedIn, function(req, res, next) {
    var successMsg = req.flash('success')[0];
    var ticket_name = req.body.ticket_name || null;
    var ticket_email = req.body.ticket_email || null;
    var errorMsg = req.flash('error')[0];
    var price = req.body.price || null;
    var type = req.body.type || null;

    /* new product to be added to cart */

    var productId = req.body.productId || null;
    /* tickets need to have name and email recorded */
    if (type == 'TICKET') {
        req.checkBody("ticket_email", "Enter a valid email address.").isEmail();
    }
    if (type =='VARPRICE') {
        if (price >= 1000) {
            errors=1;
            req.flash('error', 'Unable to accept donations greater than $1000.00');
            return res.redirect('/');
        }
        if (price < 0) {
            req.flash('error', 'Unable to process negative donations.');
            return res.redirect('/');
        }
    }
    var errors = req.validationErrors();
    if (errors) {
        returnObject = {
            errorMsg: errors,
            noErrorMsg: false,
            noMessage: true
        };
        req.flash('error', 'Invalid email address.  Please re-enter.');
        return res.redirect('/');
    }

    // var errors = req.validationErrors();
    // if (errors) {
    //  errorMsg=req.flash('error','There have been validation errors: ' + util.inspect(errors), 400);
    //  return res.redirect('/');
    // }

    var size = req.body.option || null;
    // if we have a cart, pass it - otherwise, pass an empty object
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product) {
        if (err) {
            // replace with err handling
            var errorMsg = req.flash('error', 'unable to find product');
            return res.redirect('/');
        }
        
        if (product.Product_Group == 'VARPRICE') {
            theprice = price;
        } else {
            theprice = product.price;
        }
        added=cart.add(product, product.id, theprice, size, ticket_name, ticket_email, product.Product_Group, product.taxable, product.shipable, req.user._id);
        // cart.totalTax = 0;
        meanlogger.log('plus','Added ' + product.name + ' to cart',req.user);

        if (added) {
            req.flash('error', added.message);
            res.redirect('/');
        } else {
            cart.totalShipping = 0;
            req.session.cart = cart;
            req.flash('success', 'Item successfully added to cart. ');
            res.redirect('/');
        }
        
        // });
    });
});

router.get('/add-to-cart/:id/', function(req, res, next) {
    var ticket_name = req.body.ticket_name || "";
    var ticket_email = req.body.ticket_email || "";
    var size = req.body.option || "";
    var productId = req.params.id;
    // if we have a cart, pass it - otherwise, pass an empty object
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
        if (err) {
            // replace with err handling
            req.flash('error', err.message);
            res.redirect('/');
        }
        taxCalc.calculateTax(productId, req.user._id, function(err, taxInfo) {
            if (err) {
                taxAmount = 0;
            } else {
                taxAmount = taxInfo.taxAmount;
            }
            cart.add(product, product.id, product.price, taxAmount, size, ticket_name, ticket_email, product.type, product.taxable, product.shipable, req.user._id);
            req.session.cart = cart; 
            meanlogger.log('plus','Added ' + product.name + ' to cart',req.user);
// store cart in session

            req.flash('success', 'Item Successfully added to cart.' + JSON.stringify(cart));
            res.redirect('/');
        });
    });
});

router.get('/empty-cart', isLoggedIn, function(req, res, next) {
    var cart = new Cart({});
    cart.empty();
    req.session.cart = cart;
    meanlogger.log('trash','Emptied cart',req.user);

    res.redirect('/');

});

router.get('/reduce-qty/:id/', function(req, res, next) {
    var productId = req.params.id;
    // if we have a cart, pass it - otherwise, pass an empty object
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId, function(err, product) {
        if (err) {
            // replace with err handling
            return res.redirect('/');
        }

        if (!product) {
            //res.render('shop/shopping-cart',{products: null, errorMsg: "Product not found.",noErrorMsg:0})
            req.flash('error', 'Cannot locate product');
            return res.redirect('/');
        }
        cart.reduce(product, product.id, product.price);
        req.session.cart = cart; // store cart in session
        res.redirect('/shopping-cart');
    });
});

router.get('/shopping-cart', function(req, res, next) {
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {
            products: null,
            user: req.user
        });
    }
    var cart = new Cart(req.session.cart);
    var cartJSON = JSON.stringify(cart);
    var totalTax = parseFloat(Number(cart.totalTax).toFixed(2));
    var totalPrice = parseFloat(Number(cart.totalPrice).toFixed(2));
    var totalShipping = parseFloat(Number(cart.totalShipping).toFixed(2));
    var totalPriceWithTax = parseFloat(Number(cart.totalPriceWithTax).toFixed(2));
    var totalTax = parseFloat(Number(cart.totalTax).toFixed(2));
    var grandTotal = parseFloat(Number(cart.grandTotal).toFixed(2));
    var products = cart.generateArray();
    recommendations.GetRecommendations(cart, function(err, recommendations) {
        if (err) {
            errorMsg = req.flash('error :', err.message);
        }
        if (!recommendations && res.locals.showRecommendations) {
            recommendations = [{
                code: 'cam1000',
                title: 'Gorgeous Fresh Hat Camera',
                description: 'Error ea velit et explicabo.',
                price: 973,
                imagePath: '/img/lumix-camera.jpg'
            }, {
                code: 'cam1001',
                title: 'Tasty Metal Chicken Camera',
                description: 'Lumix Incredible orchid Tasty Metal Chicken Camera',
                price: 360,
                imagePath: '/img/sony-camera.jpg'
            }]
        }
        res.render('shop/shopping-cart', {
            products: cart.generateArray(),
            items: cart.generateObject(),
            allcats: req.session.allcats,
            totalTax: totalTax,
            viewDocuments: viewDocuments,
            totalPrice: totalPrice,
            cartJSON: cartJSON,
            totalShipping: totalShipping,
            grandTotal: cart.grandTotal,
            recommendations: recommendations,
            user: req.user,
            localUser: (req.user.state == taxConfig.ourStateCode),
            errorMsg: errorMsg,
            noErrorMsg: !errorMsg,
            successMsg: successMsg,
            noMessage: !successMsg
        });
    })
        //    Category.find({}, function(err,allcats) {
        //  if (err) {
        //      req.flash.error('error','Error retrieiving categories');
        //      res.redirect('/');
        //  }
        //  if (!allcats) {
        //      req.flash.error('error','Error retrieving categories.');
        //      res.redirect('/');

    //  }
    //  req.session.allcats = allcats
    // });

})

router.post('/update_shipping', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    var cart = new Cart(req.session.cart);
    var errorMsg = req.flash('error')[0];

    res.render('shop/checkout', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice.toFixed(2),
        user: req.user,
        successMsg: successMsg,
        noMessage: !successMsg,
        errorMsg,
        noErrorMsg: !errorMsg
    });
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }

    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    var cart = new Cart(req.session.cart);
    var errorMsg = req.flash('error')[0];
    meanlogger.log('shopping-cart','Viewed checkout',req.user);

    res.render('shop/checkout', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice.toFixed(2),
        user: req.user,
        successMsg: successMsg,
        noMessage: !successMsg,
        errorMsg,
        noErrorMsg: !errorMsg
    });
});

router.post('/checkout', function(req, res, next) {
    var method = req.body.method;
    var item_name = req.body.item_name;
    var shipping_addr1 = req.body.shipping_addr1;
    var shipping_city = req.body.shipping_city;
    var shipping_state = req.body.shipping_state;
    var shipping_zip = req.body.shipping_zip;
    var cart = new Cart(req.session.cart);
    meanlogger.log('shopping-cart','Viewed checkout',req.user);

    taxDesc = "";
    var subtotal = parseFloat(req.body.amount);
    var shippingtotal = 0;
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    products = cart.generateArray();
    shippingCalc.calculateShipping(products, function(err, result) {
        if (err) {
            console.log("Unable to calculate shipping " + err);
            errorMsg = req.flash('error', err.message);
            return res.redirect('/');
        }
        shippingtotal = result.totalShipping;
        if (shipping_state == taxConfig.ourStateCode) {
            taxDesc = "PA and Philadelphia Sales Tax Applies";
            products = cart.generateArray();
            taxCalc.calculateTaxAll(products, req.user._id, function(err, results) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }
                if (!req.session.cart) {
                    return res.redirect('/shopping-cart');
                }
                var totalTax = results.taxAmount.toFixed(2);
                var grandtotal = (parseFloat(subtotal) + parseFloat(totalTax) + parseFloat(shippingtotal));
                var errorMsg = req.flash('error')[0];

                res.render('shop/checkout', {
                    user: req.user,
                    shipping_addr1: shipping_addr1,
                    shipping_city: shipping_city,
                    shipping_state: shipping_state,
                    shipping_zip: shipping_zip,
                    taxDesc: taxDesc,
                    products: cart.generateArray(),
                    subtotal: subtotal,
                    totalTax: totalTax,
                    shippingtotal: shippingtotal,
                    grandtotal: grandtotal,
                    successMsg: successMsg,
                    noMessage: !successMsg,
                    errorMsg: errorMsg,
                    noErrorMsg: !errorMsg
                });
            })
        } else {
            var totalTax = 0;
            var grandtotal = (parseFloat(subtotal) + parseFloat(shippingtotal));
            res.render('shop/checkout', {
                user: req.user,
                shipping_addr1: shipping_addr1,
                shipping_city: shipping_city,
                shipping_state: shipping_state,
                shipping_zip: shipping_zip,
                taxDesc: taxDesc,
                products: cart.generateArray(),
                subtotal: subtotal,
                totalTax: totalTax,
                shippingtotal: shippingtotal,
                grandtotal: grandtotal,
                successMsg: successMsg,
                noMessage: !successMsg,
                errorMsg: errorMsg,
                noErrorMsg: !errorMsg
            });
        }
    });
});

router.post('/create', function(req, res, next) {
    // reference: https://github.com/paypal/PayPal-node-SDK/search?p=2&q=tax&utf8=%E2%9C%93
    var method = req.body.method;
    var amount = parseFloat(req.body.amount);
    var shippingtotal = parseFloat(req.body.shippingtotal);
    var subtotal = parseFloat(req.body.subtotal);
    var taxAmount = parseFloat(req.body.totalTax);
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    products = cart.generateArray();
    //11-17-2016
    tax = taxCalc.calculateTaxReturn(products, req.user._id);
    var create_payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": String(amount.toFixed(2)),
                "details": {
                    "subtotal":String(subtotal.toFixed(2)),
                    "tax":String(taxAmount.toFixed(2)),
                    "shipping":String(shippingtotal.toFixed(2)),
                    "handling_fee": "0.00",
                    "shipping_discount": "0.00"
                }
            },
            "description": "Purchase",
            "item_list": {
                "items": []
            }
        }]
    };
    var custom = {}
    var item_list = [];
    for (var i = 0, len = products.length; i < len; i++) {
        var price = parseFloat(products[i].price);
        price = String(price.toFixed(2));
        qty = Number(products[i].qty);
        tname = 'ticket_name_' + i;
        var ticket_name = req.body['ticket_name_' + i];
        var ticket_email = req.body['ticket_email_' + i];
        var size = req.body['size_' + i];
        custom[i] = { "ticket_name": ticket_name, "ticket_email": ticket_email };
        item = {
                "name": products[i].item.title,
                "price": price,
                "quantity": qty,
                "currency": "USD",
                "sku": products[i].item.code
            }
            // if (products[i].item.Product_Group=="TICKET") {
            //     item.ticket_name = ticket_name;
            //     item.ticket_email = ticket_email;
            //     console.log("TICKET_NAME: " + item.ticket_name);
            // }
        create_payment.transactions[0].item_list.items.push(item)
    }

    if (method === 'paypal') {
        create_payment.payer.payment_method = 'paypal';
        return_url = "http://" + req.headers.host + "/execute";
        cancel_url = "http://" + req.headers.host + "/cancel";
        create_payment.redirect_urls = {
            "return_url": return_url,
            "cancel_url": cancel_url
        };
    } else if (method === 'credit_card') {
        var funding_instruments = [{
            "credit_card": {
                "type": req.body.type.toLowerCase(),
                "number": req.body.number,
                "expire_month": req.body.expire_month,
                "expire_year": req.body.expire_year,
                "first_name": req.body.first_name,
                "last_name": req.body.last_name
            }
        }];
        create_payment.payer.payment_method = 'credit_card';
        create_payment.custom = custom;
        create_payment.payer.funding_instruments = funding_instruments;
    }
    //
    // Send the payment request to paypal
    // PP will respond with a payment record that includes a redirect url
    // We'll store the payment in a document and then redirect the user
    // When the user authorizes, paypal will callback our /execute route and we'll complete the transaction
    //
    paypal.payment.create(create_payment, function(err, payment) {
        if (err) {
            errorMsg = req.flash('error', err.message);
            res.redirect('/')
        } else {
            req.session.paymentId = payment.id;
            var ourPayment = payment;
            ourPayment.user = req.user._id;
            var newPayment = new Payment(ourPayment);
            newPayment.save(function(err, newpayment) {
                if (err) {
                    errorMsg = req.flash('error', err.message);
                    console.log('error: ' + err.message);
                    return res.redirect('/shopping-cart');
                }
                // Create Order Record with a pending status.
                var order = new Order({
                    user: {
                        id: req.user._id,
                        first_name: req.user.first_name,
                        last_name: req.user.last_name,
                        email: req.user.email
                    },
                    cart: cart,
                    shipping_address: req.body.shipping_addr1,
                    shipping_city: req.body.shipping_city,
                    shipping_state: req.body.shipping_state,
                    shipping_zipcode: req.body.shipping_zipcode,
                    billing_address: req.body.shipping_addr1,
                    billing_city: req.body.shipping_city,
                    billing_state: req.body.shipping_state,
                    billing_zipcode: req.body.shipping_zipcode,
                    paymentId: payment.id,
                    status: 'pending'
                });
                order.save(function(err) {
                    if (err) {
                        req.flash('error', 'Unable to save order.');
                        res.redirect('/');
                    }
                })
                var redirectUrl;
                if (payment.payer.payment_method === 'paypal') {
                    var done = 0;
                    for (var i = 0; i < payment.links.length; i++) {
                        done++;
                        var link = payment.links[i];
                        if (link.method === 'REDIRECT') {
                            redirectUrl = link.href;
                        }
                        if (done == payment.links.length) {
                            return res.redirect(redirectUrl);
                        }
                    }
                }
            });
        }
    });
});

router.get('/like/:id', isLoggedIn, function(req, res, next) {
    var theId = new ObjectId(req.params.id);
    Product.findOneAndUpdate({
        _id: theId
    }, {
        $addToSet: {
            "likes": req.user._id
        }
    }, {
        safe: true,
        upsert: false
    }, function(err, product) {
        console.log(err);
    });
    res.redirect('/');
});

router.get('/execute', function(req, res, next) {
    var paymentId = req.query.paymentId;
    var token = req.query.token;
    var PayerID = req.query.PayerID

    var details = {
        "payer_id": PayerID
    };

    var payment = paypal.payment.execute(paymentId, details, function(error, payment) {
        if (error) {
            console.log(error);
            res.render('error', {
                'error': error
            });

        } else {
            // Update payment record with new state - should be approved.

            Payment.find({
                id: paymentId
            }, function(err, paymentDocument) {
                if (err) {
                    res.render('error', {
                        'error': error
                    });
                }
                Payment.update({
                    id: paymentId
                }, {
                    state: payment.state
                }, function(err, numAffected) {
                    if (err) {
                        res.render('error', {
                            'error': err
                        });
                        exit();
                    }
                    Order.findOneAndUpdate({
                        paymentId: payment.id
                    }, {
                        status: payment.state
                    }, {
                        new: true
                    }, function(err, newOrder) {
                        if (err) {
                            req.flash('error', 'Unable to save order.');
                            return res.redirect('/');
                        }
                        /* Update Users Bought Array */
                        User.findOneAndUpdate({
                            _id: req.user._id
                        }, {
                            $push: {
                                "orders": newOrder
                            }
                        }, {
                            new: true,
                            safe: true,
                            upsert: true
                        }, function(err, newUser) {
                            if (err) {
                                req.flash('error', 'Unable to update user record');
                                return res.redirect('/');
                            }
                            var mailOptions = {
                                to: newUser.email,
                                from: 'techadmin@sepennaa.org',
                                subject: 'SEPIA Roundup Purchase',
                                text: 'We successfully processed an order with this email address.  If you have recieved this in error, please contact the SEPIA office at info@sepennaa.org.  Thank you for your order.\n\n' +
                                    'To review your purchase, please visit http://' + req.headers.host + '/user/profile/\n\n'
                            };
                            meanlogger.log('dollar','Completed Purchase',req.user);
                            transporter.sendMail(mailOptions, function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        });
                    });
                });
                var cart = new Cart(req.session.cart);
                products = cart.generateArray();
                req.flash('success', "Successfully processed payment!");
                var transporter = nodemailer.createTransport(smtpConfig.connectString);
                tickets = cart.ticketSale(products, req.user);
                req.cart = null;
                var cart = new Cart({});
                req.session.cart = cart;

                res.redirect('/');
            });
        }; // res.render('shop/complete', { 'payment': payment, message: 'Problem Occurred' });
    });
});

router.get('/complete', function(req, res, next) {
    var messages = req.flash('error');
    res.render('shop/paypal-test', {
        error: req.flash('error')[0]
    });
});

router.get('/cancel', function(req, res) {
    var paymentId = req.query.paymentId;
    var token = req.query.token;
    var PayerID = req.query.PayerID
    var details = {
        "payer_id": PayerID
    };
    Payment.update({
        id: paymentId
    }, {
        state: payment.state
    }, function(err, numAffected) {
        if (err) {
            res.render('error', {
                'error': err
            });
            exit();
        }
        successMsg = req.flash('success', 'Purchase Cancell');
        return res.render('/');
    });
});

router.post('/search', function(req, res, next) {
    var q = req.body.q;
    var successMsg = req.flash('success')[0];
    var errorMsg = req.flash('error')[0];
    Product.aggregate([{
        $match: {
            $text: {
                $search: q
            }
        }
    }, {
        $sortByCount: "$category"
    }], function(err, allcats) {
        if (err) {
            req.flash('error', 'An error has occurred - ' + err.message);
            return res.redirect('/');
        }
        Product.find({
                $text: {
                    $search: q
                }
            }, {
                score: {
                    $meta: "textScore"
                }
            })
            .sort({
                score: {
                    $meta: 'textScore'
                }
            })
            .exec(function(err, results) {
                // count of all matching objects
                if (err) {
                    req.flash('error', "An error has occurred - " + err.message);
                    return res.redirect('/');
                }
                if (!results || !results.length) {
                    req.flash('error', "No products found for search string.");
                    return res.redirect('/');
                }
                productChunks = [];
                chunkSize = 4;
                for (var i = (4 - chunkSize); i < results.length; i += chunkSize) {
                    productChunks.push(results.slice(i, i + chunkSize))
                }
                meanlogger.log('search','Searched for  ' + q,req.user);

                res.render(shopPage, {
                    layout: shopLayout,
                    products: productChunks,
                    allcats: allcats,
                    user: req.user,
                    q: q,
                    errorMsg: errorMsg,
                    noErrorMsg: !errorMsg,
                    successMsg: successMsg,
                    noMessage: !successMsg,
                    isLoggedIn: req.isAuthenticated()
                });
            });
    });
});

router.get('/product/:id/', function(req, res, next) {
    var productId = req.params.id;
    // if we have a cart, pass it - otherwise, pass an empty object
    Product.findById(productId, function(err, product) {
        if (err) {
            // replace with err handling
            return res.redirect('/');
        }
        recommendations.GetRecommendations(product, function(err, recommendations) {
            if (err) {
                console.log("error: " + err);
                req.flash('error', "An error has occurred - " + err.message);
                return res.redirect('/');
            }
            res.render('shop/product', {
                layout: 'fullpage.hbs',
                recommendations: recommendations,
                product: product,
                errorMsg: "Product not found.",
                noErrorMsg: 0
            });
        });
    });
});

router.init = function(c) {
    config = c;
    paypal.configure(c.api);
}

module.exports = router;

function userInfo(req, res, next) {
    if (req.user) {
        return req.user;
    }
    return "No User";
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
