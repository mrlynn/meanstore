var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
var async = require('async');
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

var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;

// Product.remove({},function(err,results) {});
// Category.remove({},function(err,results) {});
products = [];
product_groups = ['Laser','Dot Matrix','Sheet Fed','Continuous Paper','Wax Dye Sublimation'];

categories = ['Office','Home'];
brands = ['HP','Epson','Lexmark','Xerox','Kyocera'];
connectivities = ['WiFi','Apple Airprint','Bluetooth','USB','Ethernet'];
var done = 0;
async.times(100, function(i, next) {
	pgroup = Math.floor((Math.random() * product_groups.length - 1) + 1);
	product_group = product_groups[pgroup];
	var numUsers = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	User.aggregate([
		{
			$sample: { size: numUsers }
		},{
			$project: { _id: 1 }
		}
	], function(err,usersArray) {
		if (err) {
			console.log(err);
			process.abort();
		}
		var items = []
		/*
		 * Build an array of users to add to purchasers for this product
		 */
		for(user in usersArray) {
			items.push(usersArray[user]._id);
		};

		var code = 1000 + i;
		var color = faker.commerce.color(); /* random color */
		var materialBrand = faker.commerce.productMaterial(); /* random material */

		typeNum = Math.floor((Math.random() * categories.length-1) + 1);
		brandNum = Math.floor((Math.random() * brands.length-1) + 1);
		conNum = Math.floor((Math.random() * connectivities.length-1) + 1);
		connectivity = connectivities[conNum];
		brand = brands[brandNum];
		imagePath = '/img/' + brand.toLowerCase() + '-printer.jpg'
		name = faker.commerce.productName() + ' Printer';
		price = Math.floor((Math.random() * 100000 - 1) + 1);
		cost = Math.floor((Math.random() * price) + (price / 2));
		title = faker.commerce.productAdjective() + ' ' + color + ' ' + name
		slug = title.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
		product = new Product({
			code: 'pri' + code,
			name: name,
            inventory: {
                onHand: 10,
                disableAtZero: Math.round(Math.random()) ? true : false,
            },
			title: title,
			slug: slug,
			description: faker.lorem.sentence(),
			taxable: 'Yes',
			shippable: 'Yes',
			quantity: Math.round(Math.random() * 100-1) + 1,
            price: price,
            cost: cost,
			sale_attributes: {
	            featured: Math.round(Math.random()) ? true : false,
	            new: Math.round(Math.random()) ? true : false,
	            trending: Math.round(Math.random()) ? true : false,
	            sale: Math.round(Math.random()) ? true : false
	        },
			'Product_Group': product_group,
			category: 'Printer',
			usersBought: items,
			Attributes: [{
				Name: 'color',
				Value: color
			},{
				Name: 'brand',
				Value: brand
			},
			{
				Name: 'Price',
				Value: price
			},
			{
				Name: 'Connectivity',
				Value: connectivity
			}],
			imagePath: imagePath
		});
		product.save(function(err,productId) {
			if (err) {
				console.log('error: ',err.message);
			}
			for(user in usersArray) {
				items.push(usersArray[user]._id);
				User.update({_id: usersArray[user]._id},{$push: {"purchased": productId._id }})
			};
		});
		done++;
		if (done==100) {
			exit();
		}
	});
});

function exit() {
	mongoose.disconnect()
}
