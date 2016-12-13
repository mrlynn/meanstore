var User = require('../models/user');
var Product = require('../models/product');
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
const maxUsers = 20;
var done=0;
for (var i=0; i < maxUsers; i++) {
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
			console.log('tick...');
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
			if (done>=maxUsers) {
				exit();
			}
		});
	});
}

function exit() {
	mongoose.disconnect();
	exit;
}
