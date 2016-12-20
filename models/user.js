var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var random = require('mongoose-simple-random');

var userSchema = new Schema({
	resetPasswordToken: String,
  	resetPasswordExpires: Date,
	email: {
		type: String,
		required: false
	},
	password: {
		type: String,
		required: false
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
	acceptedTOS: {
		type: Date
	},
	created: {
		type: Date, default: Date.now()
	},
	lastlogin: {
		type: Date, default: Date.now()
	},
	likes: [String],
	purchased: [{
		code: String,
		purchased: {
			type: Date, default: Date.now()
		}
	}],
	orders:[{
		order: {
			type: String,
		},
		paymentId: {
			type: String
		},
		status: {
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
	}],
	facebook: String,
	profile: {
	    name: String,
	    gender: String,
	    location: String,
	    website: String,
	    picture: String
	},
	tokens: Array
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.plugin(random);

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.encryptPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
