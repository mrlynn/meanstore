var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: false,
	},
	description: {
		type: String
	},
	ancestors: [{
		id: {type: Schema.Types.ObjectId, ref: 'Category', required: false},
	}]
});

module.exports = mongoose.model('Category',schema);