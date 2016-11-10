var Product = require('../models/Product');
var Category = require('../models/Category');
var mongoose = require('mongoose');

var faker = require('faker');
mongoose.Promise = global.Promise;

var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;

// Product.remove({},function(err,results) {});
// Category.remove({},function(err,results) {});
products = [];
brands = ['Sony','LG','Generic','PROSCAN','Apple','Dell','Flimsy','Freds','Throwback'];
resolutions = ['1080p','1080l','720p','1440p','4k','8k'];
var done = 0;
for (var i=0; i < 100; i++) {
	var code = 1000 + i;
	var color = faker.commerce.color();
	var materialBrand = faker.commerce.productMaterial();

	brandNum = Math.floor((Math.random() * brands.length-1) + 1);
	resNum = Math.floor((Math.random() * resolutions.length-1) + 1);
	resolution = resolutions[resNum];

	console.log(resolution);
	brand = brands[brandNum];
	imagePath = '/img/' + brand.toLowerCase() + '-television.jpg'
	name = brand + ' ' + faker.commerce.productName();
	name = name.toUpperCase();
	price = faker.commerce.price(),

	product = new Product({
		code: code,
		name: name,
		title: faker.commerce.productAdjective() + ' ' + color + ' ' + name + ' ' + 'Television',
		description: faker.lorem.sentence(),
		taxable: 'Yes',
		shipable: 'Yes',
		price: price,
		'Product_Group': 'Television',
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
			Value: price
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
