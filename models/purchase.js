var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	product: {type: Schema.Types.ObjectId, ref: 'Product'},
	alsoPurchased:[String],
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Purchase', schema);