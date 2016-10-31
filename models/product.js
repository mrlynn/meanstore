var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	order: {
		type: Number,
		required: false
	},
	imagePath: {
		type: String, 
		required: false
	},
	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	price: {
		type: Number,
		required: true
	},
	productType: {
		type: String,
		enum: ['TICKET','APPAREL','SIMPLE','VARPRICE','BOOK','PAMPHLET','AUDIO','DIGITAL','LITERATURE','ELECTRONICS'],
		required: true
	},
	attributes: [{
		name: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		}
	}],
	options: [{
		name: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		}
	}],
	created: {
		type: Date,
		default: Date.now()
	},
	update: {
		type: Date,
		default: Date.now()
	},
	soldCount: {
		type: Number
	},
	sku: {
		type: String
	},
	category: {
		type: String
	},
	categories: [{
		id: {
			type: Schema.Types.ObjectId, ref: 'Category'
		},
		name: {
			type: String
		}
	}],
	author: {
		type: String
	},
	shippingWeight: {
		type: String
	}
});

schema.virtual('isVariable')
	.get(function() {
		if (this.productType=='VARPRICE') {
			return true;
		}
	return false;
});

schema.virtual('isTicket')
	.get(function() {
		if (this.productType=='TICKET') {
			return true;
		}
	return false;
});

schema.virtual('isApparel')
	.get(function() {
		if (this.productType=='APPAREL') {
			return true;
		}
	return false;
});	
schema.methods.setPrice = function(price) {
	this.price = price;
};
module.exports = mongoose.model('Product',schema);

