var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	cart: {type: Object, required: false},
	address: {type: String, required: false},
	city: {type: String, required: false},
	state: {type: String, required: false},
	zipcode: {type: String, required: false},
	telephone: {type: String, required: false},
	name: {type: String, required: false},
	paymentId: {type: String, required: false},
	status: {type: String, required: false},
	owner: {
		ticket_name: {
			type: String,
			required: false
		},
		ticket_email: {
			type: String,
			required: false
		}
	},
	created: {
		type: Date,
		default: Date.now
	}
});



module.exports = mongoose.model('Order', orderSchema);
