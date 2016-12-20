var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	namespace: String, 
    person: {
    	id: {
    		type: Schema.Types.ObjectId, ref: 'User'
    	},
    	first_name: String,
    	last_name: String,
    	email: String
    },
    action: String,
    thing: String,
	expires_at: Date
});

module.exports = mongoose.model('Event', eventSchema);