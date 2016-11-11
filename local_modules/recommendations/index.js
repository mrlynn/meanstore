var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var Order = require('../../models/order');
var User = require('../../models/user');
var Cart = require('../../models/cart');

/* 
	Shipping Charges 
	$0 to $50 = $12.00 shipping
	$50.01 to $100 = $14.00
	$100.01 to $250 = $18.50 
*/

module.exports = {
	GetRecommendations: function(cart, callback) {
		result = null
		callback(null,result);
	}

}
