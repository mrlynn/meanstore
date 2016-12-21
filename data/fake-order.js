var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var Cart = require('../models/cart');
var mongoose = require('mongoose');
var faker = require('faker');
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


products = [];
brands = ['MongoDB','Fubu','Sean Jean'];
fabrics = ['wool','fur','fleece','paper','acrylic pellets','hemp'];
types = ['pullover','tee-shirt','pantsuit','jacket','vest'];

/* Pull Random Product */
var pcnt = Product.count({});
Product.aggregate({$sample: { size: 1 }},function(err,product) {
	if (err) {
		console.log('Error ' + err.message);
	}
	console.log(product);
});


function exit() {
	mongoose.disconnect();
}
