var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var User = require('../../models/user');
var Order = require('../../models/order');
var User = require('../../models/user');
var Cart = require('../../models/cart');

module.exports = {
	GetRecommendations: function(products, callback) {
		result = null;
		// User.find({
		// 	purchased: {
		// 		$in: $products
		// 	}
		// })
		callback(null,result);
	}

}
