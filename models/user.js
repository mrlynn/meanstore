var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var random = require('mongoose-simple-random');

var userSchema = new Schema({
	resetPasswordToken: String,
  	resetPasswordExpires: Date,
	location: {
      type: { type: String },
	  coordinates: [ Number ]
	},
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
	website: {
		type: String,
		required: false
	},
	sober_date: {
		type: Date
	},
	home_group: {
		type: String
	},
	role: {
		type: String,
		required: false,
		enum: ['visitor','admin']
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
        paymentId: String,
        status: String,
		productId: {type: Schema.Types.ObjectId, ref: 'Product', required: false},
        sku: String,
        name: String,
        category: String,
        Product_Group: String,
        ordered: {
        	type: Date, default: Date.now()
        }
	}],
	facebook: String,
	twitter: String,
	google: String,
	WordpressId: String,
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
userSchema.index({ loc : '2dsphere' });

module.exports = mongoose.model('User', userSchema);
