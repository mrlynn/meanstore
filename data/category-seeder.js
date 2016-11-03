var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

var categories = [
	new Category({
		name: 'Books',
		slug: 'books',
		description: 'Books, Pamphlets and Related',
		attributes: ['Pages', 'Author', 'Shipping Weight', 'Cover Type']
	}),
	new Category({
		name: 'Round-up',
		slug: 'round-up',
		description: 'Round-up registration and related.',
		attributes: ['Location', 'Date', 'Attendee Limit', 'More Information Link']
	}),
	new Category({
		name: 'CDs and DVDs',
		slug: 'cds-and-dvds',
		description: 'CDs and DVDs',
		attributes: ['Length']
	}),
	new Category({
		name: 'Grapevine Items',
		slug: 'grapevine',
		description: 'Grapevine and Related Items',
	}),
	new Category({
		name: 'Pamphlets',
		slug: 'pamphlets',
		description: 'Pamphlets and Literature',
	})
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
