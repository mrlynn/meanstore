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
	ticket_email: {type: String},
	ticket_name: {type: String},
	date_sold: {type: Date, default: Date.now()},
	order_id: {type: Schema.Types.ObjectId, ref: 'Order', required: false},
	ticket_type: {type: String},
	picked_up: {type: Boolean, default: false},
	pick_up_datetime: {type: Date}

});

module.exports = mongoose.model('Ticket',schema);