var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	order: {
		type: Number,
		required: false
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
        required: true
	},
	productType: {
		type: String,
		required: false
	},
	attributes: [{
		name: {
			type: String,
			required: false
		},
		value: {
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
	shipable: {
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
// shipable Getter
schema.path('shipable').get(function(txt) {
  if (txt) {
  	return 'Yes';
  } else {
  	return 'No';
  }
});

// Setter
schema.path('shipable').set(function(txt) {
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
schema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
schema.path('price').set(function(num) {
  return num * 100;
});

schema.virtual('isVariable')
	.get(function() {
		if (this.productType=='VARPRICE') {
			return true;
		}
	return false;
});

schema.virtual('isTicket')
	.get(function() {
		if (this.productType=='TICKET') {
			return true;
		}
	return false;
});

schema.virtual('isApparel')
	.get(function() {
		if (this.productType=='APPAREL') {
			return true;
		}
	return false;
});	
schema.methods.setPrice = function(price) {
	this.price = price;
};
module.exports = mongoose.model('Product',schema);

