var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	user: {
		type: Object,
		required: false
	},
	type: {
		type: String,
		required: false
	},
	message: {
		type: String,
		required: false
	},
	time: {
		type: Date,
		default: Date.now,
		required: false
	},
	count: {
		type: Number
	}
});

module.exports = mongoose.model('Activity',schema);