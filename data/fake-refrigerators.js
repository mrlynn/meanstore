var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var faker = require('faker');
var async = require('async');


var mongoose = require('mongoose');
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
categories = ['Office','Home'];
brands = ['Kenmore','Whirlpool','Electrolux','Samsung','Hitachi','Frigidare'];
freezer_options = ['Ice Maker','Counter Depth','EnergyStar Certified'];
product_groups = ['French Door','Bottom Freezer','Side by Side','Top Freezer']
    
var done = 0;
async.times(100, function(i, next) {
	pgroup = Math.floor((Math.random() * product_groups.length - 1) + 1);
    product_group = product_groups[pgroup];
	var code = 1000 + i;
	var color = faker.commerce.color();
	color = color.toUpperCase();
	var materialBrand = faker.commerce.productMaterial();

	typeNum = Math.floor((Math.random() * categories.length-1) + 1);
	brandNum = Math.floor((Math.random() * brands.length-1) + 1);
	fopt = Math.floor((Math.random() * freezer_options.length-1) + 1);
	option = freezer_options[fopt];
	brand = brands[brandNum];
	imagePath = '/img/' + brand.toLowerCase() + '-refrigerator.jpg'
	name = faker.commerce.productName() + ' Refrigerator';
	price = faker.commerce.price();
	cost = Math.floor(Math.random() * price) + (price / 2)  

	var numUsers = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	User.aggregate([{ $sample: { size: numUsers }},{$project: { _id: 1 }}], function(err,usersArray) {
		if (err) {
			console.log(err);
		}
		var items = []
		for(user in usersArray) {
			items.push(usersArray[user]._id);
		};
		typeNum = Math.floor((Math.random() * categories.length-1) + 1);
		brandNum = Math.floor((Math.random() * brands.length-1) + 1);
		fopt = Math.floor((Math.random() * freezer_options.length-1) + 1);
		option = freezer_options[fopt];
		brand = brands[brandNum];
		imagePath = '/img/' + brand.toLowerCase() + '-refrigerator.jpg'
		name = faker.commerce.productName() + ' Refrigerator';
		price = faker.commerce.price();
		cost = Math.floor(Math.random() * price) + (price / 2)  
		product = new Product({
			code: 'ref' + code,
			name: name,
			title: faker.commerce.productAdjective() + ' ' + color + ' ' + name,
			description: faker.lorem.sentence(),
			taxable: 'Yes',
			shippable: 'Yes',
			cost: cost * 100,
			sale_attributes: {
                featured: Math.round(Math.random()) ? true : false,
                new: Math.round(Math.random()) ? true : false,
                trending: Math.round(Math.random()) ? true : false,
                sale: Math.round(Math.random()) ? true : false
            },
			price: price * 100,
			'Product_Group': product_group,
			category: 'Refrigerator',
			usersBought: items,
			attributes: [{
				Name: 'color',
				Value: color
			},{
				Name: 'Additional Feature',
				Value: option
			},
			{
				Name: 'Doors',
				Value: Math.floor((Math.random() * 2-1) + 1)
			},
			{
				Name: 'Price',
				Value: price
			},
			{
				Name: 'Width',
				Value: Math.floor((Math.random() * 36-1) + 1)
			}],
			imagePath: imagePath
		});
		product.save(function(err,productId) {
			if (err) {
				console.log('error: ',err.message);
			}
			done++;
			/* go back and update users with this new product */
			for(user in usersArray) {
				items.push(usersArray[user]._id);
				User.update({_id: usersArray[user]._id},{$push: {"purchased": productId._id }})
			};
			if (done==100) {
				exit();
			}
		});
	});

});

function exit() {
	mongoose.disconnect()
}
