var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	order: {
		type: Number,
		required: false
	},
	imagePath: {
		type: String, 
		required: true
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
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	productType: {
		type: String,
		enum: ['TICKET','APPAREL','SIMPLE','VARPRICE'],
		required: true
	},
	options: [{
		name: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		}
	}]
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

