var Product = require('../models/product');
var Order = require('../models/order');
var User = require('../models/user');
var Cart = require('../models/cart');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;


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
