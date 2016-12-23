var Product = require('../models/product');
var User = require('../models/user');
var Category = require('../models/category');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.load({
    path: '.env.hackathon'
});
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;

// Product.remove({},function(err,results) {});
// Category.remove({},function(err,results) {});
products = [];
categories = ['Office','Home'];
brands = ['HP','Epson','Lexmark','Xerox','Kyocera'];
connectivities = ['WiFi','Apple Airprint','Bluetooth','USB','Ethernet'];
var done = 0;
for (var i=0; i < 100; i++) {


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

	typeNum = Math.floor((Math.random() * categories.length-1) + 1);
	brandNum = Math.floor((Math.random() * brands.length-1) + 1);
	conNum = Math.floor((Math.random() * connectivities.length-1) + 1);
	connectivity = connectivities[conNum];
	brand = brands[brandNum];
	imagePath = '/img/' + brand.toLowerCase() + '-printer.jpg'
	name = faker.commerce.productName() + ' Printer';
	price = faker.commerce.price();
	cost = Math.floor(Math.random() * price) + (price / 2)  

		product = new Product({
			code: 'pri' + code,
			name: name,
			title: faker.commerce.productAdjective() + ' ' + color + ' ' + name,
			description: faker.lorem.sentence(),
			taxable: 'Yes',
			shippable: 'Yes',
			price: price,
			cost: cost,
			'Product_Group': 'Printer',
			category: 'Printer',
			usersBought: items,
			attributes: [{
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
}

function exit() {
	mongoose.disconnect()
}
