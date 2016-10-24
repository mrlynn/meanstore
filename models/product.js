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
		enum: ['APPAREL','SIMPLE','VARPRICE'],
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

module.exports = mongoose.model('Product',schema);

