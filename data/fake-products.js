var Product = require('../models/product');
var Category = require('../models/category');
var Config = require('../config/config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var faker = require('faker');

mongoose.connect(Config.dbhost + ':' Config.dbport + '/' + Config.dbname);

products = [];
categories = ['Business','Sports','Cats','City','Abstract','Animals','Food','Nightlife','Technics'];
var done = 0;
for (var i=0; i < 100; i++) {
	var code = 1000 + i;
	var color = faker.commerce.color();
	var materialBrand = faker.commerce.productMaterial();
	typeNum = Math.floor((Math.random() * 8) + 1); 
	console.log(typeNum);
	var category = categories[typeNum];
	cat = new Category({
		name: category,
		slug: category.toLowerCase(),
		description: faker.lorem.sentence()
	});
	cat.save();
	name = faker.commerce.productName();
	imageFunction = eval('faker.image.' + category.toLowerCase() + '()');

	product = new Product({
		code: code,
		name: name,
		title: faker.commerce.productAdjective() + ' ' + color + ' ' + name,
		description: faker.lorem.sentence(),
		taxable: 'Yes',
		shipable: 'Yes',
		price: faker.commerce.price(),
		productType: materialBrand,
		category: category,
		attributes: [{
			name: 'color',
			value: color
		},{
			name: 'brand',
			value: materialBrand
		}],
		imagePath: imageFunction
	});
	category = new Category({
		name: category,
		description: null,
		slug: category.toLowerCase()
	})
	category.save(function(err) {
		if (err) {
			console.log('error',err.message);
		}
	})
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
