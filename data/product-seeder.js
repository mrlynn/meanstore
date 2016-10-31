var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

var products = [
	new Product({
		category: 'Round-up',
		order: 0,
		imagePath: 'images/ticket.jpg',
		name: 'ticket',
		title: 'Round-up Registration',
		description: 'Attendance Ticket for 2017 Round-up',
		price: 25,
		productType: 'TICKET'
	}),
	new Product({
		category: 'Round-up',
		order: 1,
		imagePath: 'images/banquet.jpg',
		name: 'banquet',
		title: 'Banquet Registration',
		description: 'Attendance Ticket for 2017 Round-up',
		price: 25,
		productType: 'TICKET'
	}),
	new Product({
		category: 'Round-up',
		order: 1,
		imagePath: 'images/test.png',
		name: 'test',
		title: 'Test Item',
		description: 'Test Attendance Ticket for 2017 Round-up',
		price: .10,
		productType: 'TICKET'
	}),	
	new Product({
		category: 'Round-up',
		order: 99,
		imagePath: 'images/ticket.jpg',
		name: 'scholarship',
		title: 'Scholarship',
		description: 'Help someone attend the round-up by donating a ticket.',
		price: 25,
		productType: 'SIMPLE'
	}),
	new Product({
		category: 'Round-up',
		order: 99,
		imagePath: 'images/heart.png',
		name: 'donation',
		title: 'Donation',
		description: 'Donate to help defray round-up costs.',
		price: 0,
		productType: 'VARPRICE'
	}),
	new Product({
		category: 'Round-up',
		order: 99,
		imagePath: 'images/heart.png',
		name: 'AA Big Book',
		title: 'The Big Book of Alcoholics Anonymous',
		description: 'This is the Fourth Edition of the Big Book, the basic text for Alcoholics Anonymous.',
		price: 0,
		productType: 'VARPRICE',
		isbn: '978-1-893007-17-8'
	}),
	new Product({
		category: 'Round-up',
		order: 2,
		imagePath: 'images/tee-shirt.jpg',
		name: 'teeshirt-small',
		title: 'Tee-Shirt (XS,S,M,L,XL)',
		description: 'Small through XL tee-shirt with Round-up Logo.   Choose specific size when you arrive.',
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
		category: 'Round-up',
		order: 3,
		imagePath: 'images/tee-shirt.jpg',
		name: 'teeshirt-large',
		title: 'Tee-Shirt (2XL,3XL,4XL)',
		description: '2XL through 3XL tee-shirt with Round-up Logo.  Choose specific size when you arrive.',
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
		category: 'Round-up',
		order: 4,
		imagePath: 'images/hoodie.jpg',
		name: 'hoodie-small',
		title: 'Hooded Sweatshirt',
		description: 'Hooded Sweatshirt with Round-up Logo. Sizes XS through XL.  Choose specific size when you arrive.',
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
		description: 'Hooded Sweatshirt with Round-up Logo. Sizes 2XL through 4XL. Choose specific size when you arrive.',
		price: 25,
		productType: 'APPAREL',
		category: 'Round-up',
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
		order: 5,
		imagePath: 'images/hoodie.jpg',
		category: 'Round-up',
		name: 'hoodie-large',
		title: 'Overfed Orangutan',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur hic deleniti commodi vero totam sapiente magnam, amet blanditiis ullam fuga nesciunt, ab accusamus eveniet consectetur. Enim aut quis neque labore.',
		price: 25,
		productType: 'SIMPLE'	
	}),
	new Product({
		order: 5,
		category: 'Round-up',
		imagePath: 'images/hoodie.jpg',
		name: 'hoodie-large',
		title: 'Bloated Buffalo',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur hic deleniti commodi vero totam sapiente magnam, amet blanditiis ullam fuga nesciunt, ab accusamus eveniet consectetur. Enim aut quis neque labore.',
		price: 11,
		productType: 'SIMPLE'	
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
