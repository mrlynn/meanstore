var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var slug = require('slug');

Category.remove({});

Product.find().distinct('category', function(err,categories) {
	if (err) {
		console.log("error " + err.message);
		exit();
	}
	var done = 0;
	for (var i = 0; i < categories.length; i++) {
		if (!categories[i]) {
			console.log('products not defined');
			exit();
		}
		var cname = categories[i];
		console.log('cname ' + cname);
		var cslug = slug(cname)
		category = new Category({
			name: cname,
			layout: 'gallery',
			slug :cslug
		})
		category.save(function(){
			done++;
			if (done==categories.length) {
				exit();
			}
		})
	}
});

function exit() {
	mongoose.disconnect() 
}
