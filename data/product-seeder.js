var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

var products = [
	new Product({
		order: 0,
		imagePath: 'images/ticket.jpg',
		name: 'ticket',
		title: 'Round-up Registration',
		description: 'Attendance Ticket for 2017 Round-up',
		price: 25,
		productType: 'SIMPLE'
	}),
	new Product({
		order: 1,
		imagePath: 'images/banquet.jpg',
		name: 'banquet',
		title: 'Banquet Registration',
		description: 'Attendance Ticket for 2017 Round-up',
		price: 25,
		productType: 'SIMPLE'
	}),	
	new Product({
		order: 99,
		imagePath: 'images/ticket.jpg',
		name: 'donation',
		title: 'Help someone attend the round-up by donating a ticket.',
		description: 'Scholarship or Donation',
		price: 0,
		productType: 'VARPRICE'
	}),
	new Product({
		order: 2,
		imagePath: 'images/tee-shirt.jpg',
		name: 'teeshirt-small',
		title: 'Tee-Shirt (XS,S,M,L,XL)',
		description: 'Small through XL tee-shirt with Round-up Logo.',
		price: 14,
		productType: 'APPAREL',
		options: [
			{
				name: 'X Small',
				value: 'XS'
			},
			{
				name: 'Small',
				value: 'S'
			},
			{
				name: 'Medium',
				value: 'M'
			},
			{
				name: 'Large',
				value: 'L'
			},
			{
				name: 'Extra Large',
				value: 'XL'
			}
		]
	}),
	new Product({
		order: 3,
		imagePath: 'images/tee-shirt.jpg',
		name: 'teeshirt-large',
		title: 'Tee-Shirt (2XL,3XL,4XL)',
		description: '2XL through 3XL tee-shirt with Round-up Logo..',
		price: 18,
		productType: 'APPAREL',
		options: [
			{
				name: '2XL',
				value: '2XL'
			},
			{
				name: '3XL',
				value: '3XL'
			},
			{
				name: '4XL',
				value: '4XL'
			}
		]
	}),
	new Product({
		order: 4,
		imagePath: 'images/hoodie.jpg',
		name: 'hoodie-small',
		title: 'Hooded Sweatshirt',
		description: 'Hooded Sweatshirt with Round-up Logo. Sizes XS through XL',
		price: 25,
		productType: 'APPAREL',
		options: [
			{
				name: 'X Small',
				value: 'XS'
			},
			{
				name: 'Small',
				value: 'S'
			},
			{
				name: 'Medium',
				value: 'M'
			},
			{
				name: 'Large',
				value: 'L'
			},
			{
				name: 'Extra Large',
				value: 'XL'
			}
		]
	}),
	new Product({
		order: 5,
		imagePath: 'images/hoodie.jpg',
		name: 'hoodie-large',
		title: 'Hooded Sweatshirt XL Sizes',
		description: 'Hooded Sweatshirt with Round-up Logo. Sizes 2XL through 4XL',
		price: 25,
		productType: 'APPAREL',
		options: [
			{
				name: '2XL',
				value: '2XL'
			},
			{
				name: '3XL',
				value: '3XL'
			},
			{
				name: '4XL',
				value: '4XL'
			}
		]		
	}),
]
var done = 0;
for (var i = 0; i < products.length; i++) {
	products[i].save(function(){
		done++;
		if (done==products.length) {
			exit();
		}
	})
}

function exit() {
	mongoose.disconnect() 
}
