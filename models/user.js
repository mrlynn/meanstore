var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	email: { 
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	first_name: {
		type: String,
		required: false
	},
	last_name: {
		type: String,
		required: false
	},
	addr1: {
		type: String,
		required: false
	},
	addr2: {
		type: String,
		required: false
	},
	city: {
		type: String,
		required: false
	},
	state: {
		type: String,
		required: false
	},
	zipcode: {
		type: String,
		required: false
	},
	telephone: {
		type: String,
		required: false
	},
	role: {
		type: String,
		required: false,
		enum: ['visitor','administrator']
	},
	created: {
		type: Date, default: Date.now()
	},
	orders:[{
		order: {
			type: String,
		},
		paymentId: {
			type: String
		},
		state: {
			type: String
		},
        items: [{
            "name": {
              type: String
            },
            "sku": {
              type: String
            },
            "price": {
              type: String
            },
            "currency": {
              type: String
            },
            "quantity": {
              type: Number
            },
            "description": {
              type: String
            },
            "tax": {
              type: String
            }
        }]
	}]
});

userSchema.methods.encryptPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
