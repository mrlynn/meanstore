var Product = require('./models/product');
var User = require('./models/user');
var Order = require('./models/order');
var Purchase = require('./models/purchase');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('./config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;

Product.find({}, function(err,products) {
	/* get long list of productsIds */
	if (err) {
		console.log(err);
	}
    var allProducts = {};
    var cnt = 0;
    products.forEach(function(product) {
      allProducts[product._id] = product;
      cnt++;
    });

    console.log('Total Products: ' + cnt );

})

function exit() {
	mongoose.disconnect();
}

function popularity(product);
	
