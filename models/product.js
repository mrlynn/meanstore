var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var random = require('mongoose-simple-random');

var Schema = mongoose.Schema;

var schema = new Schema({
	order: {
		type: Number,
		required: false
	},
	inventory: {
		onHand: Number,
		disableAtZero: Boolean
	},
	tags: [{
		type: String
	}],
	brand: String,
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
	slug: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	},
	price: {
        type: Currency,
        required: true
	},
	product_price_double: {
		type: Number,
		required: false
	},
	cost: {
        type: Currency,
        required: false
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
		},
		_id: false
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

schema.virtual('isDonation').get(function() {
	if (this.price == 0||this.price=='0'||this.Product_Group=='DONATION'||this.price=='0.00'||this.price==0.00) {
		return true;
	}
	return false;
})
schema.virtual('isVariable').get(function() {
	if (this.Product_Group=='DONATION') {
		return true;
	}
	return false;
});

schema.virtual('isTicket').get(function() {
	if (this.Product_Group=='TICKET') {
		return true;
	}
	return false;
});

schema.virtual('hasOptions').get(function() {
	if (this.options.length < 0) {
		return false;
	}
	return true;
});

schema.virtual('isApparel').get(function() {
	if (this.Product_Group=='APPAREL') {
		return true;
	}
	return false;
});
// schema.methods.setPrice = function(price) {
// 	this.price = price;
// };

// function setPrice(price) {
// 	return (price * 100).toFixed(2);

// }
// schema.methods.getPrice = function(price) {
// 	return (num / 100).toFixed(2);
// }
schema.plugin(random);

schema.index({name: 'text',title:'text',description:'text',category:'text', code: 'text'});

module.exports = mongoose.model('Product',schema);
// Getter
// schema.path('price').get(function(num) {
//   return (num / 100).toFixed(2);
// });

// // Setter
// schema.path('price').set(function(num) {
//   return num * 100;
// });

