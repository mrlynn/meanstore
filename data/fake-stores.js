var Store = require('../models/store');
var User = require('../models/user');
var Category = require('../models/category');
var mongoose = require('mongoose');
var async = require('async');
var MongoClient = require('mongodb').MongoClient
var winston = require("winston");

var logger = new (winston.createLogger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'hackathon.log' })
    ]
});
var faker = require('faker');
mongoose.Promise = global.Promise;

var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.config({
	path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
	console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
	logger.log('error', '%s MongoDB connection error. Please make sure MongoDB is running.');
	process.exit();
});

var done = 0;
async.times(20, function (i, next) {

	var q1 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	var q2 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	var q3 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	var s1 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	var s2 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
	var s3 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;

	var url = 'mongodb://localhost:27017/hackathon';
	MongoClient.connect(url, (err, db) => {
		randaddrs = db.collection('randaddr');
		randaddrs.aggregate(
			[{
				$sample: {
					size: 1
				}
			}],
			function (err, randdocs) {
				console.log(JSON.stringify(randdocs));
				title = 'MEANMart Store ' + randdocs[0].properties.storeNumber;
				slug = title.toString().toLowerCase()
					.replace(/\s+/g, '-') // Replace spaces with -
					.replace(/[^\w\-]+/g, '') // Remove all non-word chars
					.replace(/\-\-+/g, '-') // Replace multiple - with single -
					.replace(/^-+/, '') // Trim - from start of text
					.replace(/-+$/, ''); // Trim - from end of text
				store = new Store({
					storeId: randdocs[0].properties.storeNumber,
					name: 'MEANMart Store ' + randdocs[0].properties.storeNumber,
					slug: slug,
					manager: {
						first_name: faker.name.firstName(),
						last_name: faker.name.lastName(),
						telephone: faker.phone.phoneNumber(),
						mobile_phone: faker.phone.phoneNumber(),
						email: faker.internet.email()
					},
					address: {
						street: randdocs[0].properties.address,
						city: randdocs[0].properties.city,
						state: randdocs[0].properties.state,
						zipcode: randdocs[0].properties.zip
					},
					location: {
						type: "Point",
						coordinates: [randdocs[0].geometry.coordinates[0], randdocs[0].geometry.coordinates[1]]
					},
					vars: [{
							sku: 'sku' + s1,
							quantity: q1
						},
						{
							sku: 'sku' + s2,
							quantity: q2
						},
						{
							sku: 'sku' + s3,
							quantity: q3
						}
					]
				});
				store.save(function (err, productId) {
					if (err) {
						console.log('error: ', err.message);
					}

					done++;
					if (done >= 20) {
						exit();
					}
				});
			});
	});
});

function exit() {
	mongoose.disconnect()
}
