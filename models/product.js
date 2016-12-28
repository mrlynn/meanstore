var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var Schema = mongoose.Schema;

var schema = new Schema({
	order: {
		type: Number,
		required: false
	},
	status: {
		type: String
	},
	imagePath: {
		type: String,
		required: false
	},
	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	},
	price: {
        type: Number,
        required: true,
        get: getCurrency
	},
	cost: {
        type: Number,
        required: false,
        get: getCurrency
	},
	likes: [String],
	Product_Group: {
		type: String,
		required: false
	},
	sale_attributes: {
		type: Object, required: false
	},
	Attributes: [{
		Name: {
			type: String,
			required: false
		},
		Value: {
			type: String,
			required: false
		}
	}],
	options: [{
		name: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		}
	}],
	created: {
		type: Date,
		default: Date.now()
	},
	update: {
		type: Date,
		default: Date.now()
	},
	soldCount: {
		type: Number
	},
	sku: {
		type: String
	},
	category: {
		type: String
	},
	categories: [{
		name: {
			type: String
		}
	}],
	shippable: {
		type: Boolean
	},
	taxable: {
		type: Boolean
	},
	author: {
		type: String
	},
	shippingWeight: {
		type: String
	},
	code: {
		type: String
	},
	usersBought: [String],
	salesYTD: [{
		year: {
			Type: Number
		},
		salesAmount: {
			Type: Number
		},
		salesCount: {
			Type: Number
		}
	}],
	salesYearMonth: [{
		yearMonth: {
			Type: String
		},
		salesAmount: {
			Type: Number
		},
		salesCount: {
			Type: Number
		}
	}]
});
// shippable Getter
schema.path('shippable').get(function(txt) {
  if (txt) {
  	return 'Yes';
  } else {
  	return 'No';
  }
});

// Setter
schema.path('shippable').set(function(txt) {
  if (txt=='Yes') {
  	return true;
  } else {
  	return false;
  }
});
// Taxable Getter
schema.path('taxable').get(function(txt) {
  if (txt) {
  	return 'Yes';
  } else {
  	return 'No';
  }
});

// Setter
schema.path('taxable').set(function(txt) {
  if (txt=='Yes') {
  	return true;
  } else {
  	return false;
  }
});
// Getter
// schema.path('price').get(function(num) {
//   return (num / 100).toFixed(2);
// });

// // Setter
// schema.path('price').set(function(num) {
//   return num * 100;
// });

schema.virtual('isVariable')
	.get(function() {
		if (this.Product_Group=='DONATION') {
			return true;
		}
	return false;
});

schema.virtual('isTicket')
	.get(function() {
		if (this.Product_Group=='TICKET') {
			return true;
		}
	return false;
});

schema.virtual('hasOptions')
	.get(function() {
		if (this.options.length < 0) {
			return false;
		}
	return true;
});

schema.virtual('isApparel')
	.get(function() {
		if (this.Product_Group=='APPAREL') {
			return true;
		}
	return false;
});	
// schema.methods.setPrice = function(price) {
// 	this.price = price;
// };
function getCurrency(amt) {
	return (amt / 100).toFixed(2);

}
// function setPrice(price) {
// 	return (price * 100).toFixed(2);

// }
// schema.methods.getPrice = function(price) {
// 	return (num / 100).toFixed(2);
// }
schema.plugin(random);

schema.index({name: 'text',title:'text',description:'text',category:'text'});

module.exports = mongoose.model('Product',schema);

