var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
var async = require('async');
var Config = require('../config/config');
var connectstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectstring);
mongoose.Promise = global.Promise;

Product.remove({},function(err,num) {
	console.log(num + ' products removed.');
	Category.remove({},function(err,num) {
		console.log(num + ' categories removed.');
		var products = [
			new Product({
				code: 'RU201701',
				shipable: 'No',
				taxable: 'No',
				category: 'Round-up',
				order: 0,
				imagePath: 'images/ticket.jpg',
				name: 'Ticket',
				title: 'Round-up Registration',
				description: 'Attendance Ticket for 2017 Round-up',
				price: 25,
				productType: 'TICKET'
			}),
			new Product({
				code: 'RU201702',
				shipable: 'No',
				taxable: 'No',
				category: 'Round-up',
				order: 1,
				imagePath: 'images/banquet.jpg',
				name: 'Banquet',
				title: 'Banquet Registration',
				description: 'Attendance Ticket for 2017 Round-up',
				price: 25,
				productType: 'TICKET'
			}),
			new Product({
				code: 'RU201703',
				shipable: 'No',
				taxable: 'No',
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
				code: 'RU201704',
				shipable: 'No',
				taxable: 'No',
				category: 'Round-up',
				order: 99,
				imagePath: 'images/ticket.jpg',
				name: 'scholarship',
				title: 'Scholarship',
				description: 'Help someone attend the Round-up by donating a ticket.',
				price: 25,
				productType: 'SIMPLE'
			}),
			new Product({
				code: 'RU201705',
				shipable: 'No',
				taxable: 'No',
				category: 'Round-up',
				order: 99,
				imagePath: 'images/heart.png',
				name: 'donation',
				title: 'Donation',
				description: 'Donate to help defray Round-up costs.',
				price: 0,
				productType: 'VARPRICE'
			}),
			new Product({
				code: 'RU201706',
				shipable: 'No',
				taxable: 'Yes',
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
				code: 'RU201707',
				shipable: 'No',
				taxable: 'Yes',
				category: 'Round-up',
				order: 3,
				imagePath: 'images/tee-shirt.jpg',
				name: 'Teeshirt-large',
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
				code: 'RU201708',
				shipable: 'No',
				taxable: 'Yes',
				category: 'Round-up',
				order: 4,
				imagePath: 'images/hoodie.jpg',
				name: 'Hoodie-small',
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
				code: 'RU201709',
				shipable: 'No',
				taxable: 'Yes',
				imagePath: 'images/hoodie.jpg',
				name: 'Hoodie-large',
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
				code: 'RU201709',
				shipable: 'No',
				taxable: 'Yes',
				order: 5,
				imagePath: 'images/hoodie.jpg',
				category: 'Round-up',
				name: 'Hoodie-large',
				title: 'Overfed Orangutan',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur hic deleniti commodi vero totam sapiente magnam, amet blanditiis ullam fuga nesciunt, ab accusamus eveniet consectetur. Enim aut quis neque labore.',
				price: 25,
				productType: 'SIMPLE'	
			}),
			new Product({
				code: 'RU201710',
				shipable: 'No',
				taxable: 'No',
				order: 5,
				category: 'Round-up',
				imagePath: 'images/hoodie.jpg',
				name: 'Hoodie-large',
				title: 'Bloated Buffalo',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur hic deleniti commodi vero totam sapiente magnam, amet blanditiis ullam fuga nesciunt, ab accusamus eveniet consectetur. Enim aut quis neque labore.',
				price: 11,
				productType: 'SIMPLE'	
			}),
		]
		var done = 0;
		for (var i = 0; i < products.length; i++) {
			console.log(i);
			products[i].save(function(err,product){
				done++;
				if (done==products.length) {
					exit();
				}
				category_name = product.category;
				Category.find({name: category_name}, function(err,category) {
					if (err) {
						console.log("Problem finding category " + category_name + " " + err.message);
						exit();
					}
					if (!category) {
						slug = category_name.toLowerCase();
						category = new Category({
							name: product.category,
							slug: slug
						})
						category.save(function(err,result) {
							console.log(JSON.stringify(result));
						});
					} 
				});
			});
		}
	});
});
function exit() {
	mongoose.disconnect() 
}
