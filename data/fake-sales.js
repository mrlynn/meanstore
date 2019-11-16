var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var Cart = require('../models/cart');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
var winston = require("winston");

var logger = new (winston.createLogger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'hackathon.log' })
    ]
});
dotenv.config({
	path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	logger.log('error', '%s MongoDB connection error. Please make sure MongoDB is running.');
	process.exit();
});

var monthname = months[month];
var setupdate = {
	$set: {}
};
var incupdate = {
	$inc: {}
};
incupdate.$inc['months.' + months[month] + '.sales'] = doc.cart.grandTotal;
incupdate.$inc['ytd'] = doc.cart.grandTotal;
console.log("inc: " + JSON.stringify(incupdate));
db.collection('orders', function (err, orders_collection) {
	if (err) {
		console.log('error ' + error.message);
	}
	orders_collection.aggregate([{
			$group: {
				_id: {
					year: {
						$year: "$created"
					},
					momth: {
						$month: "$created"
					}
				}
			},
			$project: {
				year: {
					$year: "$created"
				},
				month: {
					$month: "$created"
				},
				week: {
					$week: "$created"
				},
				ytd: {
					$sum: "$ytd"
				},
			}
		},
		incupdate,
		{
			upsert: true
		},
		function (err, result) {
			if (err) {
				console.log("Error " + err.message);
			}
			console.log("RESULT: " + JSON.stringify(result));
		}
	]);
})
