var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	when: {
		type: Date,
		default: Date.now()
	},
	namespace: String,
    person: Object,
    action: String,
    thing: Object,
	expires_at: Date
});

module.exports = mongoose.model('Event', eventSchema);