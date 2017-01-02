var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var mongoose = require('mongoose');
var async = require('async');

var faker = require('faker');
mongoose.Promise = global.Promise;

var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.load({
    path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  logger.log('error','%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Product.remove({},function(err,results) {});
// Category.remove({},function(err,results) {});
products = [];
brands = ['Sony','LG','Generic','PROSCAN','Apple','Dell','Flimsy','Freds','Throwback'];
resolutions = ['1080p','1080l','720p','1440p','4k','8k'];
product_groups = ['Flat Screen','Cathode Ray Tube','LCD','HDTV','Curved'];

var done = 0;
async.times(100, function(i, next) {

	var numUsers = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	User.aggregate([{ $sample: { size: numUsers }},{$project: { _id: 1 }}], function(err,usersArray) {
		if (err) {
			console.log(err);
		}
		var items = []
		for(user in usersArray) {
			items.push(usersArray[user]._id);
		};
		var code = 1000 + i;
		var color = faker.commerce.color();
		var materialBrand = faker.commerce.productMaterial();

		brandNum = Math.floor((Math.random() * brands.length-1) + 1);
		resNum = Math.floor((Math.random() * resolutions.length-1) + 1);
		resolution = resolutions[resNum];

		brand = brands[brandNum];
		imagePath = '/img/' + brand.toLowerCase() + '-television.jpg'
		name = brand;
		name = name.toUpperCase();
		price = Math.floor((Math.random() * 100000 - 1) + 1);
		cost = Math.floor((Math.random() * price) + (price / 2));
		console.log("Price: " + price);
		console.log("Cost: " + cost);
		pgroup = Math.floor((Math.random() * product_groups.length - 1) + 1);
	    product_group = product_groups[pgroup];
		product = new Product({
			code: 'tel' + code,
			name: name,
            inventory: {
                onHand: 10,
                disableAtZero: Math.round(Math.random()) ? true : false,
            },
			title: faker.commerce.productAdjective() + ' ' + color + ' ' + name + ' ' + 'Television',
			description: faker.lorem.sentence(),
			taxable: 'Yes',
			shippable: 'Yes',
            price: price,
            cost: cost,
			sale_attributes: {
                featured: Math.round(Math.random()) ? true : false,
                new: Math.round(Math.random()) ? true : false,
                trending: Math.round(Math.random()) ? true : false,
                sale: Math.round(Math.random()) ? true : false
            },
			usersBought: items,
			'Product_Group': product_group,
			category: 'Television',
			Attributes: [{
				Name: 'color',
				Value: color
			},{
				Name: 'brand',
				Value: brand
			},{
				Name: "Screen Size",
				Value: Math.floor((Math.random() * 75-1) + 1)
			},{
				Name: 'Resolution',
				Value: resolution
			},{
				Name: 'Number of Ports',
				Value: Math.floor((Math.random() * 5-1) + 1)
			},{
				Name: 'Price',
				Value: 	price
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
			done++;
			if (done==100) {
				exit();
			}
		});
	});
});

function exit() {
	mongoose.disconnect() 
}
