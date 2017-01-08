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

User.findOneAndRemove({"email":"admin@admin.com"},function(err,next) {
	if (err) {
		console.log("Problem removing admin user.");
	}
	admin = new User({
		"email": "admin@admin.com",
		"first_name": "Admin",
		"last_name": "Istrator",
		"role": "admin",
		"password": "password"
	});

	admin.save(function(err) {
		if (err) {
			console.log("Error creating administrative user.");
			process.abort();
		}
		exit();
	})
})

function exit() {
	mongoose.disconnect();
	exit;
}
