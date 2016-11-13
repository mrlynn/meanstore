var User = require('../models/user');
var Product = require('../models/product');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;

products = [];

var done=0;


for (var i=0; i < 100; i++) {
	var filter = {};
	var fields = { _id: 1 };
	var options = { skip: 10, limit: 10, count: 5 }
	/* let's get 5 random products to add to the user's purchased array */
	Product.findRandom(filter, fields, options,function(err,purchasedArray) {
		if (err) {
			console.log(err);
		}
		var items = []
		for(item in purchasedArray) {
			items.push(purchasedArray[item]._id);
		};
		user = new User({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: "nopassword",
			addr1: faker.address.streetAddress(),
			city: faker.address.city(),
			state: faker.address.stateAbbr(),
			zipcode: faker.address.zipCode(),
			telephone: faker.phone.phoneNumber(),
			role: 'visitor',
			acceptedTOS: Date.now(),
			created: Date.now(),
			purchased: items
		},function(err,doc) {
			if (err) {
				console.log('error: ' + err);
			}
		});
		user.save(function(err,newuser) {
			if (err) {
				console.log('error: ',err.message);
			}
			done++;
			if (done>=100) {
				exit();
			}
		});
	});
}

function exit() {
	mongoose.disconnect();
}
