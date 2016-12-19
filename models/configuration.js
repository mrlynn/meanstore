var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	company_name: {type: Schema.Types.ObjectId, ref: 'User'},
	store_title: {type: Schema.Types.ObjectId, ref: 'Product'},
	view_documents: {type: Boolean},
	frontpage_category: { type: String },
	copyright: { type: String},
	viewTour: { type: Boolean },
	created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Config',schema);