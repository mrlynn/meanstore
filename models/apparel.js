var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	user: {
		first_name: {
			type: String
		},
		last_name: {

		},
		id: {
			type: Schema.Types.ObjectId, ref: 'User'
		},
		email: {
			type: String
		}
	},
	size: {type: String},
	date_sold: {type: Date, default: Date.now()},
	order_id: {type: Schema.Types.ObjectId, ref: 'Order', required: false},
	product_id: {type: Schema.Types.ObjectId, ref: 'Product', required: false},
	picked_up: {type: Boolean, default: false},
	pick_up_datetime: {type: Date}
});

module.exports = mongoose.model('Apparel',schema);