var mongoose = require('mongoose');
var Purchase = require('../models/purchase');
var Cart = require('../models/cart');
const dotenv = require('dotenv');
const chalk = require('chalk');
var mongodb = require("mongodb");

// dotenv.load({
// 	path: '.env.hackathon'
// });

//get instance of MongoClient to establish connection
//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost

var Schema = mongoose.Schema;

var orderSchema = new Schema({
	user: {
		type: Object,
		required: false
	},
	cart: {
		type: Object,
		required: false
	},
	billing_address: {
		type: String,
		required: false
	},
	billing_city: {
		type: String,
		required: false
	},
	billing_state: {
		type: String,
		required: false
	},
	billing_zipcode: {
		type: String,
		required: false
	},
	shipping_address: {
		type: String,
		required: false
	},
	shipping_city: {
		type: String,
		required: false
	},
	shipping_state: {
		type: String,
		required: false
	},
	shipping_zipcode: {
		type: String,
		required: false
	},
	telephone: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: false
	},
	paymentId: {
		type: String,
		required: false
	},
	status: {
		type: String,
		required: false
	},
	receipt_status: {
		type: String,
		required: false,
		default: 'New'
	},
	receiver: {
		type: String,
		required: false
	},
	total: {
    type: Number,
    default: 0
  },
	paidBy: {
		type: String,
		default: 'Paypal',
		enum: ['Paypal', 'Cash', 'Check'],
		required: false
	},
	note: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/* This method called when an order is saved */
orderSchema.post('save', function(doc) {
	/* generate recommendations collection */
	/* Loop through all cart products:
	   1. Find a purchase record for the product.
	   2. If found, search the also purchased products array.
	   2a. if not found add it.
	   3.
	   */
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	dbHost = process.env.MONGODB_URI;
	var db;

	var MongoClient = mongodb.MongoClient;

	MongoClient.connect(dbHost, function(err, db) {
		if (err) {
			console.log("Error: " + errror.message);
		}
		var dateObj = new Date();
		var month = dateObj.getUTCMonth(); //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		var sdoc = {};
		var monthname = months[month];
		var setupdate = {
			$set: {}
		};
		var incupdate = {
			$inc: {}
		};
		incupdate.$inc['months.' + months[month] + '.sales'] = doc.cart.total;
		incupdate.$inc['ytd'] = doc.cart.total;
		db.collection('sales', function(err, collection) {
			if (err) {
				console.log('error ' + error.message);
			}
			collection.update({
					year: year
				},
				incupdate, {
					upsert: true
				},
				function(err, result) {
					if (err) {
						console.log("Error " + err.message);
					}
					console.log("RESULT: " + JSON.stringify(result));
				});
		})

	});
});

this.createPurchase = function(product, othersArray, cb) {
	purchase = new Purchase({
		code: product,
		alsoPurchased: othersArray
	});
	purchase.save(function(err) {
		if (err) {
			console.log('error: ' + err.message);
		}
	})
	return cb();
};

module.exports = mongoose.model('Order', orderSchema);
