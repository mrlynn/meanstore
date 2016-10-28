var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

var categories = [
	new Category({
		name: 'Events',
		description: 'Events and Related'
	}),
	new Category({
		name: 'Literature',
		description: 'Books, Pamphlets and Related'
	}),
	new Category({
		name: 'Books',
		description: 'Books, Pamphlets and Related'
	}),
	new Category({
		name: 'Apparel',
		description: 'Tee-shirts, Hoodies, etc.',
	}),
]
var done = 0;
for (var i = 0; i < categories.length; i++) {
	categories[i].save(function(){
		done++;
		if (done==categories.length) {
			exit();
		}
	})
}

function exit() {
	mongoose.disconnect() 
}
