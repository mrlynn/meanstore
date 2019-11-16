var Product = require('../models/product');
var mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.config({
    path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  logger.log('error','%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

var products = [
	new Product({
        "name": "Sony Liquid Toaster",
        "title": "Water Cooled Toaster",
        "price": 10.3,
        "description": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',

        "category": "Electronics",
        "productType": "ELECTRONICS",
        "attributes": [{
			name: 'voltage',
			value: 'DC'
		},{
			name: 'weight',
			value: '25.5lbs'
		}]    
	}),
	new Product({
        "name": "Sony Liquid Toaster",
        "title": "Water Cooled Toaster",
        "price": 10.3,
        "description": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',

        "category": "Electronics",
        "productType": "ELECTRONICS",
        "attributes": [{
			name: 'voltage',
			value: 'DC'
		},{
			name: 'weight',
			value: '25.5lbs'
		}]    
	}),
	new Product({
        "name": "Sony Liquid Toaster",
        "title": "Water Cooled Toaster",
        "price": 10.3,
        "description": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',

        "category": "Electronics",
        "productType": "ELECTRONICS",
        "attributes": [{
			name: 'voltage',
			value: 'DC'
		},{
			name: 'weight',
			value: '25.5lbs'
		}]    
	}),
	new Product({
        "name": "Sony Liquid Toaster",
        "title": "Water Cooled Toaster",
        "price": 10.3,
        "description": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',

        "category": "Electronics",
        "productType": "ELECTRONICS",
        "attributes": [{
			name: 'voltage',
			value: 'DC'
		},{
			name: 'weight',
			value: '25.5lbs'
		}]    
	}),
	new Product({
        "name": "Sony Liquid Toaster",
        "title": "Water Cooled Toaster",
        "price": 10.3,
        "description": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',

        "category": "Electronics",
        "productType": "ELECTRONICS",
        "attributes": [{
			name: 'voltage',
			value: 'DC'
		},{
			name: 'weight',
			value: '25.5lbs'
		}]    
	}),
	new Product({
        "name": "Sony Liquid Toaster",
        "title": "Water Cooled Toaster",
        "price": 10.3,
        "description": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic error quibusdam temporibus veritatis. Debitis, veritatis reprehenderit neque alias, labore, mollitia eos tempora voluptas, nam nesciunt quas iusto. Earum, vitae, culpa!',

        "category": "Electronics",
        "productType": "ELECTRONICS",
        "attributes": [{
			name: 'voltage',
			value: 'DC'
		},{
			name: 'weight',
			value: '25.5lbs'
		}]    
	})
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
