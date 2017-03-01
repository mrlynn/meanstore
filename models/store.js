var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    name: String,
    storeId: String,
    slug: String,
	address: {
		street: String,
		city: String,
        state: String,
        zipcode: String,
        _id: false
	},
    location: {
      type: { type: String },
	  coordinates: [ Number ]
	},
    vars: {},
    manager: {
        _id: false,
        first_name: String,
        last_name: String,
        telephone: String,
        mobile_phone: String,
        email: String
    }
});

module.exports = mongoose.model('Store', storeSchema);