var Product = require('../models/product');
var User = require('../models/user');
var Order = require('../models/order');
var Category = require('../models/category');
var mongoose = require('mongoose');
var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.load({
    path: '.env.hackathon'
});
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
console.log("Removing data from " + Config.dbname + '/products');
Product.remove({},function(err,results) {
	if (err) {
		console.log('error: ', err.message);
		process.exit(-1);
	}
	console.log('Results: ' + JSON.stringify(results));
	console.log("Removing data from " + Config.dbname + '/category');
	Category.remove({}, function(err,results) {
		if (err) {
			console.log('error: ', err.message);
		}
		console.log('Results: ' + JSON.stringify(results));
		User.remove({}, function(err, results) {
			if (err) {
				console.log('error: ', err.message);
				process.exit(-1);
			}
		});
	});
	process.exit();
});
