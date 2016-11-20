var mongoose = require('mongoose');
var Purchase = require('../models/purchase');
var Cart = require('../models/cart');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	cart: {type: Object, required: false},
	billing_address: {type: String, required: false},
	billing_city: {type: String, required: false},
	billing_state: {type: String, required: false},
	billing_zipcode: {type: String, required: false},
	shipping_address: {type: String, required: false},
	shipping_city: {type: String, required: false},
	shipping_state: {type: String, required: false},
	shipping_zipcode: {type: String, required: false},
	telephone: {type: String, required: false},
	name: {type: String, required: false},
	paymentId: {type: String, required: false},
	status: {type: String, required: false},
	owner: {
		ticket_name: {
			type: String,
			required: false
		},
		ticket_email: {
			type: String,
			required: false
		}
	},
	created: {
		type: Date,
		default: Date.now
	}
});

/* This method called when an order is saved */
orderSchema.post('save', function(doc) {
  /* generate recommendations collection */
  /* Loop through all cart products:
     1. Find a purchase record for the product.
     2. If found, search the also purchased products array.
     2a. if not found add it.
     3.
     */
    var ids = [];
    for (var item in doc.cart.items) {
    	ids.push(doc.cart.items[item].item.code);
    }
    for (var item in doc.cart.items) {
        if (typeof doc.cart.items[item] == "object" && doc.cart.items[item]) {
        	var prod = doc.cart.items[item].item.code;
			var index = ids.indexOf(prod);
			otherids = ids;
			if(index != -1)
			    otherids.splice( index, 1 );
			console.log("Now Code: " + prod);
			console.log("Other Ids: " + otherids.toString());
	    	Purchase.findOne({'code': prod}, function(err,purchaserecord) {
	    		if (err) {
	    			console.log('error :' + err.message);
	    		}
	    		if (purchaserecord) {
	    			 /*found a purchase record for the product - search for the products
	    			   in the also purchased (Cart) and add them if they don't exist     */
	    			console.log("Found a Purchase Records for product code: " + prod);
	    		} else {
	    			 // product purchase record not found - create one with the product and
	    			 //   a list of all the other products purchased.
					console.log("Did NOT find a Purchase Records for product code: " + prod);
					if (otherids.count() > 0) {
						purchase = new Purchase({
							code: prod,
							alsoPurchased: otherids
						});
						purchase.save(function(err) {
							if (err) {
								console.log('error: ' + err.message);
							}
							console.log("Purchase record created for " + prod);
						})
					}
	    		}
		    })
		}
	}
});

this.createPurchase = function(product,othersArray,cb) {
  purchase = new Purchase({
  	code: product,
  	alsoPurchased: othersArray
  });
  purchase.save(function(err) {
  	if (err) {
  		console.log('error: ' + err.message);
  	}
  })
  return cb();
};

module.exports = mongoose.model('Order', orderSchema);
