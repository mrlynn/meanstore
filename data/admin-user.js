	var User = require('../models/user');
	var Product = require('../models/product');
	var mongoose = require('mongoose');
	var faker = require('faker');
	var Config = require('../config/config');
	const dotenv = require('dotenv');
	const chalk = require('chalk');
	dotenv.config({
		path: '.env.hackathon'
	});

	if (process.env.NODE_ENV) {
	// console.log("USING .env.hackathon-" + process.env.NODE_ENV);
	dotenv.config({ path: '.env.hackathon-' + process.env.NODE_ENV });
	} else {
	console.log("USING .env.hackathon" );
	dotenv.config({ path: '.env.hackathon' });
	}

	var options = {
	db: { native_parser: true },
	user: process.env.MONGO_USER,
	pass: process.env.MONGO_PASS,
	authSource: 'admin'
	}
	mongoose.Promise = global.Promise;
	if (process.env.MONGO_USER) {
	console.log("USING MONGO_USER " + process.env.MONGO_USER);
	var URI = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@localhost:27017/hackathon';
	mongoose.connect(URI, options);
	} else {
	mongoose.connect('mongodb://localhost:27017/hackathon');
	}
	mongoose.connection.on('error', () => {
	console.log('%s MongoDB connection error in app.js Please make sure MongoDB is running.', chalk.red('✗'));
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
			"password": "adminPass"
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
