var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
	address: {
		street: String,
		city: String,
        state: String,
        zipcode: String
	},
    loc : { lng : Number , lat : Number },
	hours: {
        _id: false,
        Sunday: {
            Opened: Boolean,
            Open: Date,
            Close: Date
        },
        Monday: {
            Open: Date,
            Opened: Boolean,
            Close: Date
        },
        Tuesday: {
            Opened: Boolean,
            Open: Date,
            Close: Date
        },
        Wednesday: {
            Opened: Boolean,
            Open: Date,
            Close: Date
        },
        Thursday: {
            Open: Date,
            Opened: Boolean,
            Close: Date
        },
        Friday: {
            Open: Date,
            Opened: Boolean,
            Close: Date
        },
        Saturday: {
            Open: Date,
            Opened: Boolean,
            Close: Date
        },
    },
    manager: {
        first_name: String,
        last_name: String,
        telephone: String,
        mobile_phone: String
    }
});

module.exports = mongoose.model('Event', eventSchema);