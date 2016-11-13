var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	code: String,
	alsoPurchased:[String],
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Purchase', schema);