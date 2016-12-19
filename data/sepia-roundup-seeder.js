var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
var async = require('async');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.load({
    path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    logger.log('error', '%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

var products = [
    new Product({
        code: 'RU201701',
        shipable: 'No',
        taxable: 'No',
        category: 'Round-up',
        order: 0,
        imagePath: '/images/ticket.jpg',
        name: 'Ticket',
        title: 'Round-up Registration',
        description: 'Attendance Ticket for 2017 Round-up',
        price: 2500,
        Product_Group: 'TICKET'
    }),
    new Product({
        code: 'RU201702',
        shipable: 'No',
        taxable: 'No',
        category: 'Round-up',
        order: 1,
        imagePath: '/images/banquet.jpg',
        name: 'Banquet',
        title: 'Banquet Registration',
        description: 'Attendance Ticket for 2017 Round-up',
        price: 2500,
        Product_Group: 'TICKET'
    }),
    new Product({
        code: 'RU201703',
        shipable: 'No',
        taxable: 'Yes',
        category: 'Round-up',
        order: 1,
        imagePath: '/images/test.png',
        name: 'test',
        title: 'Test Item',
        description: 'Test Attendance Ticket for 2017 Round-up',
        price: 10,
        Product_Group: 'TICKET'
    }),
    new Product({
        code: 'RU201704',
        shipable: 'No',
        taxable: 'Yes',
        category: 'Round-up',
        order: 99,
        imagePath: '/images/ticket.jpg',
        name: 'scholarship',
        title: 'Scholarship',
        description: 'Help someone attend the Round-up by donating a ticket.',
        price: 2500,
        Product_Group: 'SIMPLE'
    }),
    new Product({
        code: 'RU201705',
        shipable: 'No',
        taxable: 'No',
        category: 'Round-up',
        order: 99,
        imagePath: '/images/heart.png',
        name: 'donation',
        title: 'Donation',
        description: 'Donate to help defray Round-up costs.',
        price: 0,
        Product_Group: 'VARPRICE'
    }),
    new Product({
        code: 'RU201706',
        shipable: 'No',
        taxable: 'Yes',
        category: 'Round-up',
        order: 2,
        imagePath: '/images/tee-shirt.jpg',
        name: 'teeshirt-small',
        title: 'Tee-Shirt (XS,S,M,L,XL)',
        description: 'Small through XL tee-shirt with Round-up Logo.   Choose specific size when you arrive.',
        price: 1400,
        Product_Group: 'APPAREL',
        options: [{
            name: 'X Small',
            value: 'XS'
        }, {
            name: 'Small',
            value: 'S'
        }, {
            name: 'Medium',
            value: 'M'
        }, {
            name: 'Large',
            value: 'L'
        }, {
            name: 'Extra Large',
            value: 'XL'
        }]
    }),
    new Product({
        code: 'RU201707',
        shipable: 'No',
        taxable: 'Yes',
        category: 'Round-up',
        order: 3,
        imagePath: '/images/tee-shirt.jpg',
        name: 'Teeshirt-large',
        title: 'Tee-Shirt (2XL,3XL,4XL)',
        description: '2XL through 3XL tee-shirt with Round-up Logo.  Choose specific size when you arrive.',
        price: 1800,
        Product_Group: 'APPAREL',
        options: [{
            name: '2XL',
            value: '2XL'
        }, {
            name: '3XL',
            value: '3XL'
        }, {
            name: '4XL',
            value: '4XL'
        }]
    }),
    new Product({
        code: 'RU201708',
        shipable: 'No',
        taxable: 'Yes',
        category: 'Round-up',
        order: 4,
        imagePath: '/images/hoodie.jpg',
        name: 'Hoodie-small',
        title: 'Hooded Sweatshirt',
        description: 'Hooded Sweatshirt with Round-up Logo. Sizes XS through XL.  Choose specific size when you arrive.',
        price: 2500,
        Product_Group: 'APPAREL',
        options: [{
            name: 'X Small',
            value: 'XS'
        }, {
            name: 'Small',
            value: 'S'
        }, {
            name: 'Medium',
            value: 'M'
        }, {
            name: 'Large',
            value: 'L'
        }, {
            name: 'Extra Large',
            value: 'XL'
        }]
    }),
    new Product({
        order: 5,
        code: 'RU201709',
        shipable: 'No',
        taxable: 'Yes',
        imagePath: '/images/hoodie.jpg',
        name: 'Hoodie-large',
        title: 'Hooded Sweatshirt XL Sizes',
        description: 'Hooded Sweatshirt with Round-up Logo. Sizes 2XL through 4XL. Choose specific size when you arrive.',
        price: 2500,
        Product_Group: 'APPAREL',
        category: 'Round-up',
        options: [{
            name: '2XL',
            value: '2XL'
        }, {
            name: '3XL',
            value: '3XL'
        }, {
            name: '4XL',
            value: '4XL'
        }]
    })
]
var done = 0;
for (var i = 0; i < products.length; i++) {
    console.log(i);
    console.log(products[i].name);
    products[i].save(function(err, product) {
    	if (err) {
    		console.log("Error: " + err.message);
    		process.abort();
    	}
        done++;
        if (done == products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect()
}
