var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
var faker = require('faker');
var dotenv = require('dotenv');
const chalk = require('chalk');
mongoose.Promise = global.Promise;


dotenv.load({ path: '.env.example' });
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
// Product.remove({},function(err,results) {});
// Category.remove({},function(err,results) {});
products = [];
categories = ['Office','Home'];
brands = ['HP','Epson','Lexmark','Xerox','Kyocera'];
connectivities = ['WiFi','Apple Airprint','Bluetooth','USB','Ethernet'];
var done = 0;
for (var i=0; i < 100; i++) {
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
	product = new Product({
		code: 'pri' + code,
		name: name,
		title: faker.commerce.productAdjective() + ' ' + color + ' ' + name,
		description: faker.lorem.sentence(),
		taxable: 'Yes',
		shipable: 'Yes',
		price: price,
		'Product_Group': 'Printer',
		category: 'Printer',
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
