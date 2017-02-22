var Store = require('../models/store');
var User = require('../models/user');
var Category = require('../models/category');
var mongoose = require('mongoose');
var async = require('async');

var faker = require('faker');
mongoose.Promise = global.Promise;

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

var done = 0;
async.times(100, function(i, next) {
    title = 'MEANMart Store ' + i;
    var q1 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    var q2 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    var q3 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    var s1 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    var s2 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    var s3 = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    slug = title.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    store = new Store({
        storeId:i,
        name: title,
        slug: slug,
        manager: {
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            telephone: faker.address.telephone,
            mobile_phone: faker.address.telephone,
            email: faker.address.email
        },
        address: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            zipcode: faker.address.zipCode()
        },
        location: {
		    type: "Point",
		    coordinates: [ faker.address.latitude(), faker.address.longitude() ]
	    },
        vars:[
            {sku:'sku' + s1, quantity:q1},
            {sku:'sku' + s2, quantity:q2},
            {sku:'sku' + s3, quantity:q3}
        ]
    });
    store.save(function(err,productId) {
        if (err) {
            console.log('error: ',err.message);
        }
        
        done++;
        if (done==100) {
            exit();
        }
    });
});

function exit() {
	mongoose.disconnect() 
}
