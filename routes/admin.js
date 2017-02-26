var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Category = require('../models/category');
var Configuration = require('../models/configuration');
var Product = require('../models/product');
var User = require('../models/user');
var Ticket = require('../models/ticket');
var Activity = require('../models/activity');
var Event = require('../models/events');
var async = require('async');
var Order = require('../models/order');
var Store = require('../models/store');
var sigma = require('sigma');
var passport = require('passport');
var moment = require('moment');
var mongoose = require('mongoose');
// var csrf = require('csurf');
var User = require('../models/user');
var Payment = require('../models/payment');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var csv = require('ya-csv');
var uuid = require('uuid');
var Config = require('../config/config');
var Stats = require('../local_modules/stats');
var meanlogger = require('../local_modules/meanlogger');
var fileUpload = require('express-fileupload');
// var csrfProtection = csrf();

// router.use(csrfProtection);
/* Get Stores for geo map */
router.get('/stores', function(req, res, next) {
    errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
    var tot = totalSales(function(err,next) {
    	if (err) {
    		console.log(err.message);
    		return res.error('err');
    	}
    });
    Store.find({}, function(err, docs) {
        res.render('admin/stores', {
            layout: 'admin-map.hbs',
            stores: docs,
            errorMsg: errorMsg,
            successMsg: successMsg,
            noErrorMsg: !errorMsg,
            noMessage: !successMsg,
            totalSales: tot,
            GOOGLE_APIKEY: process.env.GOOGLE_APIKEY,
            orders: docs,
            noErrors: 1
        });
    });
})
/* Get Relations for graph map */
router.get('/relations', function(req, res, next) {
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Relationships";
    var adminPageUrl = "/admin/relations";
	successMsg = req.flash('success')[0];
    var tot = totalSales(function(err,next) {
    	if (err) {
    		console.log(err.message);
    		return res.error('err');
    	}
    });

    res.render('admin/relations', {
        layout: 'admin-relations.hbs',
        adminPageTitle: adminPageTitle,
        adminPageUrl: adminPageUrl,
        errorMsg: errorMsg,
        successMsg: successMsg,
        noErrorMsg: !errorMsg,
        noMessage: !successMsg,
        totalSales: tot,
        noErrors: 1
    });
})
/* GET home page. */
router.get('/',  isAdmin, function(req, res, next) {
	errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
    var tot = totalSales(function(err,next) {
    	if (err) {
    		console.log(err.message);
    		return res.error('err');
    	}
    });
    Order.find({}, function(err, docs) {
        meanlogger.log("check","Viewed",req.user);
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
            res.render('admin/dashboard', {
                layout: 'admin-page.hbs',
                products: productChunks,
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

router.get('/orders:filter?', isAdmin, function(req, res, next) {
    var filter = req.query.filter;
    meanlogger.log("check","Viewed orders",req.user);

    if (!filter || filter=='allOrders') {
        var allOrders = true;
        var pendingOrders = false;
        var pickedUpOrders = false;
        qryFilter = {};
    } else {
        if (filter=='pendingOrders') {
            var allOrders = false;
            var pendingOrders = true;
            var pickedUpOrders = false;
            qryFilter = {$or: [{ receipt_status: 'pending'},{receipt_status: 'partial'}, {receipt_status: 'New'}, {receipt_status: ''}]};
        } else {
            if (filter=='pickedUpOrders'|| filter=='complete') {
                var allOrders = false;
                var pendingOrders = false;
                var pickedUpOrders = true;
                qryFilter = {receipt_status: 'complete'};
            }
        }
    }
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Orders";
    var adminPageUrl = "/admin/orders";

    Order.find(qryFilter).sort({"created": -1}).exec(function(err, orders) {
        Stats.getStats(function(err,stats){
            if (err) {
                console.log(error.message);
                res.send(500,"error fetching orders");
            }
            res.render('admin/orders', {
                adminPageTitle: adminPageTitle,
                adminPageUrl: adminPageUrl,
                layout: 'admin-page.hbs',
                // csrfToken: req.csrfToken(),
                noMessage: !successMsg,
                noErrorMsg: !errorMsg,
                allOrders: allOrders,
                pendingOrders: pendingOrders,
                pickedUpOrders: pickedUpOrders,
                errorMsg: errorMsg,
                user: req.user,
                stats: stats,
                orders: orders,
                isLoggedIn:req.isAuthenticated(),
                successMsg: successMsg
            });
        })

    })
});

router.post('/delete-order',  isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var order_id = req.body._id;
    meanlogger.log("trash","Deleting Order " + order_id,req.user);

    Order.remove({_id: order_id}, function(err) {
        if (err) {
            res.send(500,'Error deleting order.');
        }
        return res.redirect('/admin/orders');
    })
})

router.post('/update-order',  isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var status = req.body.status;
    var receiver = req.body.receiver;
    var note = req.body.note;
    var order_id = req.body._id;
    var query = { '_id': order_id };
    Order.findOne({_id: order_id}, function(err, order) {
        console.log("Order: " + order);
        if (err) {
            res.send(500,'Error deleting order.');
        }
        order.receipt_status = status;
        order.note = note;
        order.receiver = receiver;
        order.save(function(err) {
            if (err)
                console.log("ERROR: " + err.message);
        })
        return res.redirect('/admin/orders');
    })
})

router.get('/users:filter?', isAdmin, function(req, res, next) {

    var filter = req.query.filter;
    console.log("Filter " + filter);
    qryFilter = {};

    if (!filter || filter=='allOrders') {
        var allUsers = true;
        var adminUsers = false;
        var nonAdminUsers = false;
        qryFilter = {};
    } else {
        if (filter=='adminUsers') {
            var allUsers = false;
            var adminUsers = true;
            var nonAdminUsers = false;
            qryFilter = { role: 'admin'};
        } else {
            if (filter=='nonAdminUsers') {
                var allUsers = false;
                var adminUsers = false;
                var nonAdminUsers = true;
                qryFilter = {$or: [{ role: ''},{role: 'user'}, {role: 'New'}, {role: 'visitor'}]};
            }
        }
    }
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Users";
    var adminPageUrl = "/admin/users";

    console.log("Stats in route " + JSON.stringify(res.locals.stats));
    User.find(qryFilter, function(err, users) {
        Stats.getStats(function(err,stats){
            if (err) {
                console.log(error.message);
                res.send(500,"error fetching orders");
            }
            res.render('admin/users', {
                adminPageTitle: adminPageTitle,
                adminPageUrl: adminPageUrl,
                layout: 'admin-page.hbs',
                // csrfToken: req.csrfToken(),
                noMessage: !successMsg,
                noErrorMsg: !errorMsg,
                allUsers: allUsers,
                adminUsers: adminUsers,
                nonAdminUsers: nonAdminUsers,
                errorMsg: errorMsg,
                user: req.user,
                stats: stats,
                users: users,
                isLoggedIn:req.isAuthenticated(),
                successMsg: successMsg
            });
        })

    })
});

/* Edit User */
router.post('/edit-user',isAdmin, function(req, res, next) {
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    user = {};
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log("ERROR: " + err.message);
        } else {
            if (!user) {
                user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    role: req.body.role
                });
            } else {
                user.first_name = req.body.first_name || '';
                user.last_name = req.last_name.name || '';
                user.email = req.body.email || '';
                user.role = req.body.role || '';
            }
        }
        user.save(function(err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            res.redirect('/admin/users');
        })
    });

});


/* Delete Users */

router.post('/delete-user',  isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var user_id = req.body._id;
    meanlogger.log("trash","Deleting User " + user_id,req.user);

    User.remove({_id: user_id}, function(err) {
        if (err) {
            res.send(500,'Error deleting user.');
        }
        return res.redirect('/admin/users');
    })
})
/* Display all tickets purchased */
router.get('/tickets', isAdmin, function(req, res, next) {

    Ticket.find({},function(err,tickets) {
        if (err) {
            console.log("Error: " + err.message);
        }
        res.render('admin/tickets', {
            layout: 'admin-page.hbs',
            // csrfToken: req.csrfToken(),
            noMessage: !successMsg,
            noErrorMsg: !errorMsg,
            errorMsg: errorMsg,
            user: req.user,
            isLoggedIn:req.isAuthenticated(),
            successMsg: successMsg
        });
    })

});

/* display logger activities */
router.get('/activities:filter?', isAdmin, function(req, res, next) {
    var filter = req.query.filter;
    console.log("Filter " + filter);
    if (!filter || filter=='allOrders') {
        var allOrders = true;
        var pendingOrders = false;
        var pickedUpOrders = false;
        qryFilter = {};
    } else {
        if (filter=='pendingOrders') {
            var allOrders = false;
            var pendingOrders = true;
            var pickedUpOrders = false;
            qryFilter = {$or: [{ receipt_status: 'pending'},{receipt_status: 'partial'}, {receipt_status: 'New'}, {receipt_status: ''}]};
        } else {
            if (filter=='pickedUpOrders'|| filter=='complete') {
                var allOrders = false;
                var pendingOrders = false;
                var pickedUpOrders = true;
                qryFilter = {receipt_status: 'complete'};
            }
        }
    }
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Activity Log";
    var adminPageUrl = "/admin/activities";

    Activity.find(qryFilter).sort({time: 'desc'}).exec( function(err, activities) {
        Stats.getStats(function(err,stats){
            if (err) {
                console.log(error.message);
                res.send(500,"error fetching orders");
            }
            res.render('admin/activities', {
                adminPageTitle: adminPageTitle,
                adminPageUrl: adminPageUrl,
                layout: 'admin-page.hbs',
                // csrfToken: req.csrfToken(),
                noMessage: !successMsg,
                noErrorMsg: !errorMsg,
                allOrders: allOrders,
                pendingOrders: pendingOrders,
                pickedUpOrders: pickedUpOrders,
                errorMsg: errorMsg,
                user: req.user,
                stats: stats,
                activities: activities,
                isLoggedIn:req.isAuthenticated(),
                successMsg: successMsg
            });
        });
    });
});

router.post('/delete-activity',  isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var activity_id = req.body._id;
    meanlogger.log("trash","Deleting Activity " + activity_id,req.user);

    Activity.remove({_id: activity_id}, function(err) {
        if (err) {
            res.send(500,'Error deleting activity.');
        }
        return res.redirect('/admin/activities');
    })
})


/* display logger events */
router.get('/events:filter?', isAdmin, function(req, res, next) {

    var filter = req.query.filter;

    if (!filter || filter=='allEvents') {
        var allEvents = true;
        var likeEvents = false;
        var viewEvents = false;
        var purchaseEvents = false;
        qryFilter = {};
    } else {
        if (filter=='likeEvents') {
            var allEvents = false;
            var likeEvents = true;
            var viewEvents = false;
            var purchaseEvents = false;
            qryFilter = { action: 'like' };
        } else {
            if (filter=='viewEvents') {
                var allEvents = false;
                var likeEvents = false;
                var viewEvents = true;
                var purchaseEvents = false;
                qryFilter = { action: 'view' };
            } else {
                var allEvents = false;
                var likeEvents = false;
                var viewEvents = false;
                var purchaseEvents = true;
                qryFilter = { action: 'purchase' };
            }
        }
    }
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Event Log";
    var adminPageUrl = "/admin/events";
/* main admin stats chart is as follows

data: [
    {x: '2016 Q1', tickets: 3, banquet: 7},
    {x: '2016 Q2', tickets: 3, banquet: 4},
    {x: '2016 Q3', tickets: null, banquet: 1},
    {x: '2015 Q4', tickets: 2, banquet: 5},
    {x: '2015 Q3', tickets: 8, banquet: 2},
    {x: '2015 Q2', tickets: 4, banquet: 4}
  ],

  */
Event.aggregate([
    { "$group": {
        "_id": {
            "year": {"$year": "$when" },
            "month": {"$month": "$when" }
            },
          "count": { "$sum": 1 }
        }
    },
  ], function(err,yearmos){
    var data = [];

    if (err) {
        console.log("error: " + err.message);
    } else {
        var i = 0;
        async.each(yearmos,function(yearmo,next) {
            data.push({
                x: yearmo._id.year + '-' + yearmo._id.month,
                purchases: yearmo.count
            })
        })
    }



    Event.find(qryFilter).sort({when: 'desc'}).exec( function(err, events) {
        Stats.getStats(function(err,stats){
            if (err) {
                console.log(error.message);
                res.send(500,"error fetching orders");
            }
            res.render('admin/events', {
                adminPageTitle: adminPageTitle,
                adminPageUrl: adminPageUrl,
                layout: 'admin-page.hbs',
                // csrfToken: req.csrfToken(),
                yearmo: data,
                noMessage: !successMsg,
                noErrorMsg: !errorMsg,
                allEvents: allEvents,
                likeEvents: likeEvents,
                viewEvents: viewEvents,
                purchaseEvents: purchaseEvents,
                errorMsg: errorMsg,
                user: req.user,
                stats: stats,
                events: events,
                isLoggedIn:req.isAuthenticated(),
                successMsg: successMsg
            });
        });
    });
});
});

router.post('/delete-event',  isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    meanlogger.log("trash","Deleting Event " + req.body.id,req.user);
    Event.remove({_id: req.body.id}, function(err) {
        if (err) {
            res.send(500,'Error deleting event.');
        }
        return res.redirect('/admin/events');
    })
})


/* Render file upload for data input */
router.get('/import',  isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0]
    res.render('admin/import', {
	    layout: 'admin-page.hbs',
		// csrfToken: req.csrfToken(),
	    noMessage: !successMsg,
	    noErrorMsg: !errorMsg,
	    errorMsg: errorMsg,
	    user: req.user,
	    isLoggedIn:req.isAuthenticated(),
	    successMsg: successMsg
	});
});

/* Recieve posted CSV */
router.post('/import',  isAdmin, function(req, res, next) {
    var sampleFile;
    console.log('File name is ' + req.files.csvFile.name);
    console.log('File size is ' + req.files.csvFile.size);
    console.log('File size is ' + req.files.csvFile.path);
 	var firstHeaders = req.body.header;
    if (!req.files) {
    	if (!req.body.csvPaste) {
        	res.send('No files were uploaded and no data pasted.');
        	return;
    	}
    }
    csvFile = req.files.csvFile;
    tmpFile = uuid.v4() + '.csv'
    csvFile.mv('/var/tmp/' + tmpFile, function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
        	// req.flash('success','File successfully uploaded');
            // res.send('File uploaded!');
            var reader = csv.createCsvFileReader('/var/tmp/' + tmpFile, {
			    'separator': ',',
			    'quote': '"',
			    'escape': '"',
			    'comment': '',
			    'columnsFromHeader': firstHeaders
			});
			reader.addListener('data', function(data) {
			    writer.writeRecord([ data[0] ]);
			});
			console.log(data);
        }
    });
});

/* GET home page. */
router.get('/products:filter?', isAdmin,function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Products";
    var adminPageUrl = "/admin/products";

    var filter = req.query.filter;
    console.log("Filter " + filter);
    qryFilter = {};
    if (!filter || filter=='allProducts') {
        var allProducts = true;
        var deletedProducts = false;
        // qryFilter = {status: { $ne: 'deleted'}};
        qryFilter = {};
    } else {
        if (filter=='deletedProducts') {
            var allOrders = false;
            var deletedProducts = true;
            // qryFilter = { status: 'deleted'};
            qryFilter = { };
        }
    }
    Product.find(qryFilter,function(err, products) {
        Category.find({},function(err,allcats) {

            Stats.getStats(function(err,stats){
                if (err) {
                    console.log(error.message);
                    res.send(500,"error fetching products");
                }
                res.render('admin/products', {
                    adminPageTitle: adminPageTitle,
                    adminPageUrl: adminPageUrl,
                    layout: 'admin-page.hbs',
                    allProducts: allProducts,
                    deletedProducts: deletedProducts,
                    // csrfToken: req.csrfToken(),
                    noMessage: !successMsg,
                    noErrorMsg: !errorMsg,
                    errorMsg: errorMsg,
                    user: req.user,
                    stats: stats,
                    products: products,
                    allcats: allcats,
                    isLoggedIn:req.isAuthenticated(),
                    successMsg: successMsg
                });
            })
        });
    });
});

router.post('/delete-product',  isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var product_id = req.body._id;

    Product.findOne({_id: product_id}, function(err, product) {
        if (err) {
            res.send(500,'Error deleting order.');
        }
        product.status = 'deleted';
        product.save(function(err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.redirect('/admin/products');
        });
    })
})

router.post('/edit-product',isAdmin, function(req, res, next) {
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    var imageFile;
    var updated = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        Product_Group: req.body.Product_Group,
        taxable: req.body.taxable,
        shippable: req.body.shippable
    }
    if (req.files) {
        imageFile = req.files.imageFile;
        imageFile.mv(process.env.imagePath + '/' + req.body.name + '.png' , function(err) {
            if (err) {
                res.status(500).send(err);
            }
        })
        updated.imagePath = '/images/' + req.body.name + '.png'

    }
    Product.findOneAndUpdate({_id: req.body._id}, { $set: updated }, function(err,product) {
            if (err) {
                console.log("Unable to update product - " + err.message);
                req.flash('error',"Unable to update product - " + err.message);
                return res.redirect('/admin/products');
            };
            console.log("Product " + req.body.name + " Updated");
            req.flash('success','Product ' + req.body.name + ' Updated!');
            return res.redirect('/admin/products');
    });
});

router.post('/add-product',isAdmin, function(req, res, next) {
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    var imageFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    imageFile = req.files.imageFile;
    imageFile.mv(process.env.imagePath + '/' + req.body.name + '.png' , function(err) {
        if (err) {
            res.status(500).send(err);
        }
        product = new Product({
            name: req.body.name,
            code: req.body.code,
            title: req.body.title,
            Product_Group: req.body.Product_Group,
            price: parseFloat((req.body.price * 100).toFixed(2)),
            description: req.body.description,
            shippable: req.body.shippable,
            taxable: req.body.taxable,
            category: req.body.category,
            imagePath: '/images/' + req.body.name + '.png'
        })
        product.save(function(err) {
            if (err) {
                req.flash('error','Error: ' + err.message);
                return res.redirect('/admin/products');
            }
            console.log("product: " + product);
            return res.redirect('/admin/products');
        });
    });
});

router.get('/categories:filter?', isAdmin,function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Categories";
    var adminPageUrl = "/admin/categories";

    var filter = req.query.filter;
    qryFilter = {};
    if (!filter || filter=='allCategories') {
        var allCategories = true;
        var deletedCategories = false;
        qryFilter = {};
    } else {
        if (filter=='deletedCategories') {
            var allCategories = false;
            var deletedCategories = true;
            qryFilter = { status: 'deleted'};
        }
    }
    Category.find(qryFilter,function(err, categories) {
        Stats.getStats(function(err,stats){
            if (err) {
                console.log(error.message);
                res.send(500,"error fetching categories");
            }
            res.render('admin/categories', {
                adminPageTitle: adminPageTitle,
                adminPageUrl: adminPageUrl,
                layout: 'admin-page.hbs',
                allCategories: allCategories,
                deletedCategories: deletedCategories,
                // csrfToken: req.csrfToken(),
                noMessage: !successMsg,
                noErrorMsg: !errorMsg,
                errorMsg: errorMsg,
                user: req.user,
                stats: stats,
                categories: categories,
                isLoggedIn:req.isAuthenticated(),
                successMsg: successMsg
            });
        });
    });
});

router.post('/edit-category',isAdmin, function(req, res, next) {
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    category = {};
    Category.findById(req.body.id, function(err, category) {

        if (err) {
            console.log("ERROR: " + err.message);
        } else {
            if (!category) {
                category = new Category({
                    description: req.body.description,
                    name: req.body.name,
                    slug: req.body.slug,
                    layout: req.body.layout
                });
            } else {
                category.description = req.body.description || '';
                category.name = req.body.name || '';
                category.slug = req.body.slug || '';
                category.layout = req.body.layout || '';
                category.updated = Date.now();
            }
        }
                                console.log("Found: " + JSON.stringify(category));

        category.save(function(err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            res.redirect('/admin/categories');
        })
    });

});

router.post('/delete-category',isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];

    Category.findOne({_id: req.body.id}, function(err, category) {
        if (err) {
            res.send(500,'Error deleting category.');
        }
        category.status = 'deleted';
        category.save(function(err) {
            if (!err) {
                console.log("updated");
                req.flash('success','Category deleted.');

            } else {
                console.log(err);
                req.flash('error','Unable to delete category');
            }
            return res.redirect('/admin/categories');
        });
    })
})

router.get('/configuration',isAdmin, function(req, res, next) {
    errorMsg = req.flash('error')[0];
    successMsg = req.flash('success')[0];
    var adminPageTitle = "Configuration";
    var adminPageUrl = "/admin/configuration";
    Configuration.findOne({}, function(err, config) {
        if (err) {
            req.flash('error','Error: ' + err.message);
            return res.redirect('/admin');
        }
        res.render('admin/configuration',{
            config: config,
            adminPageTitle: adminPageTitle,
            adminPageUrl: adminPageUrl,
            layout: 'admin-page.hbs',
            errorMsg: errorMsg,
            successMsg: successMsg,
            noErrorMsg: !errorMsg,
            noMessage: !successMsg
        })
    });
})
router.get('/setup', isAdmin, function(req, res, next) {
	errorMsg = req.flash('error')[0];
	successMsg = req.flash('success')[0];
	res.render('admin/setup',{
		config: Config
	})
})

/* display logger activities */
router.get('/dashboard', isAdmin, function(req, res, next) {
    successMsg = req.flash('success')[0];
    errorMsg = req.flash('error')[0];
    var adminPageTitle = "Dashboard";
    var adminPageUrl = "/admin/dashboard";
    Stats.getStats(function(err,stats){
        if (err) {
            console.log(error.message);
            res.send(500,"error fetching orders");
        }
        res.render('admin/dashboard', {
            adminPageTitle: adminPageTitle,
            adminPageUrl: adminPageUrl,
            layout: 'admin-page.hbs',
            // csrfToken: req.csrfToken(),
            noMessage: !successMsg,
            noErrorMsg: !errorMsg,
            errorMsg: errorMsg,
            user: req.user,
            stats: stats,
            isLoggedIn:req.isAuthenticated(),
            successMsg: successMsg
        });
    });
});

module.exports = router;
function isAdmin(req, res, next) {
    if (!req.isAuthenticated()|| !req.user) {
        return res.redirect('/');
    } else {
        if (req.user.role == 'admin') {
            return next();
        } else {
            return res.redirect('/');
        }
    }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

var totalSales = function() {
    Order.aggregate({
        $match: {
            "status": "approved"
        }
    }, {
        $group: {
            _id: null,
            'Total': {
                $sum: 'cart.total'
            }
        }
    }, function(err, doc) {
    	if (err) {
    		console.log("err: " + err.message);
            return err;
    	}
		return doc;

    });
}
