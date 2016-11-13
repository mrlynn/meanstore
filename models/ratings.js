var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	productId: {type: Schema.Types.ObjectId, ref: 'Product'},
	rating: {type: Number},
	created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Rating',schema);