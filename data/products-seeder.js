var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

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
