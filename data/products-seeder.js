var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

var products = [
	new Product({
		category: 'Electronics',
		order: 0,
		imagePath: 'images/products/water-toaster.jpg',
		name: 'Sony Liquid Toaster',
		title: 'Water Cooled Toaster',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',
		price: 79.99,
		productType: 'Television'
	}),
	new Product({
		category: 'Electronics',
		order: 0,
		imagePath: 'images/products/water-toaster.jpg',
		name: 'Sony Liquid Toaster',
		title: 'Water Cooled Toaster',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',
		price: 79.99,
		productType: 'Television'
	}),
	new Product({
		category: 'Electronics',
		order: 0,
		imagePath: 'images/products/water-toaster.jpg',
		name: 'Sony Liquid Toaster',
		title: 'Water Cooled Toaster',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',
		price: 79.99,
		productType: 'Television'
	}),
	new Product({
		category: 'Electronics',
		order: 0,
		imagePath: 'images/products/water-toaster.jpg',
		name: 'Sony Liquid Toaster',
		title: 'Water Cooled Toaster',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',
		price: 79.99,
		productType: 'Television'
	}),
	new Product({
		category: 'Electronics',
		order: 0,
		imagePath: 'images/products/water-toaster.jpg',
		name: 'Sony Liquid Toaster',
		title: 'Water Cooled Toaster',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',
		price: 79.99,
		productType: 'Television'
	}),
	new Product({
		category: 'Electronics',
		order: 0,
		imagePath: 'images/products/water-toaster.jpg',
		name: 'Sony Liquid Toaster',
		title: 'Water Cooled Toaster',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',
		price: 79.99,
		productType: 'Television'
	}),
	new Product({
		category: 'Electronics',
		order: 0,
		imagePath: 'images/products/water-toaster.jpg',
		name: 'Sony Liquid Toaster',
		title: 'Water Cooled Toaster',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',
		price: 79.99,
		productType: 'Television'
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
