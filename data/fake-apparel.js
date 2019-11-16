var Product = require('../models/product');
var User = require('../models/user');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
const async = require('async');
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

products = [];
brands = ['MongoDB', 'Fubu', 'Sean Jean'];
fabrics = ['wool', 'fur', 'fleece', 'paper', 'acrylic pellets', 'hemp'];
types = ['pullover', 'tee-shirt', 'pantsuit', 'jacket', 'vest'];


var done = 0;
async.times(100, function(i, next) {
	var numUsers = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	User.aggregate([{
		$sample: {
			size: numUsers
		}
	}, {
		$project: {
			_id: 1
		}
	}], function(err, usersArray) {
		if (err) {
			console.log(err);
		}
		var items = []
		for (user in usersArray) {
			items.push(usersArray[user]._id);
		};
		var code = parseInt(1000 + i);
		var color = faker.commerce.color();
		var materialBrand = faker.commerce.productMaterial();
		typeNum = Math.floor((Math.random() * brands.length - 1) + 1);
		brandNum = Math.floor((Math.random() * brands.length - 1) + 1);
		fabricNum = Math.floor((Math.random() * fabrics.length - 1) + 1);
		type = types[typeNum];

		fabric = fabrics[fabricNum];
		brand = brands[brandNum];
		imagePath = '/img/' + type + '-clothes.jpg'
		var category = 'Apparel';
		name = faker.commerce.productName() + ' ' + type;
		price = Math.floor((Math.random() * 10000 - 1) + 1);
		cost = Math.floor((Math.random() * price) + (price / 2));
		title = brand + ' ' + faker.commerce.productAdjective() + ' ' + color + ' ' + name
				slug = title.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
		product = new Product({
			code: 'app' + code,
			name: name,
			inventory: {
				onHand: 10,
				disableAtZero: Math.round(Math.random()) ? true : false,
			},
			sale_attributes: {
				featured: Math.round(Math.random()) ? true : false,
				new: Math.round(Math.random()) ? true : false,
				trending: Math.round(Math.random()) ? true : false,
				sale: Math.round(Math.random()) ? true : false
			},
			title: title,
			slug: slug,
			description: faker.lorem.sentence(),
			taxable: 'Yes',
			shippable: 'Yes',
			price: price,
			cost: cost,
			'Product_Group': 'Apparel',
			category: 'Apparel',
			usersBought: items,
			Attributes: [{
				Name: 'color',
				Value: color
			}, {
				Name: 'brand',
				Value: brand
			}, {
				Name: "Fabric",
				Value: fabric
			}, {
				Name: 'Price',
				Value: price
			}],
			imagePath: imagePath,
			likes: ["123321", "232122", "1232123", "d03k1231", "1231kdf1"]
		});

		product.save(function(err, productId) {
			if (err) {
				console.log('error: ', err.message);
			}
			for (user in usersArray) {
				items.push(usersArray[user]._id);
				User.update({
					_id: usersArray[user]._id
				}, {
					$push: {
						"purchased": productId._id
					}
				})
			};
		});
		done++;
		if (done == 100) {
			exit();
		}
	});
});

function exit() {
	mongoose.disconnect();
}
