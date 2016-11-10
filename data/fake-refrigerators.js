var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var faker = require('faker');
var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
// Product.remove({},function(err,results) {});
// Category.remove({},function(err,results) {});
products = [];
categories = ['Office','Home'];
brands = ['Kenmore','Whirlpool','Electrolux','Samsung','Hitachi','Frigidare'];
freezer_options = ['Ice Maker','Counter Depth','EnergyStar Certified'];
var done = 0;
for (var i=0; i < 100; i++) {
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
	product = new Product({
		code: 'ref' + code,
		name: name,
		title: faker.commerce.productAdjective() + ' ' + color + ' ' + name,
		description: faker.lorem.sentence(),
		taxable: 'Yes',
		shipable: 'Yes',
		price: price,
		'Product_Group': 'Refrigerator',
		category: 'Refrigerator',
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
	product.save(function(err) {
		if (err) {
			console.log('error: ',err.message);
		}
	});
	done++;
	if (done==100) {
		exit();
	}
}

function exit() {
	mongoose.disconnect()
}
