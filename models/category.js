var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		dropDups: true
	},
	slug: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false
	},
	layout: {
		type: String
	},
	ancestors: [{
		id: {type: Schema.Types.ObjectId, ref: 'Category', required: false},
	}],
	attributes: [ String ],
	updated: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Category',schema);