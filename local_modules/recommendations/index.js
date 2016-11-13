var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var User = require('../../models/user');
var Order = require('../../models/order');
var User = require('../../models/user');
var Cart = require('../../models/cart');

// module.exports = {
exports.GetRecommendations = function(products) {
	User.find({
		purchased: {
			$in: $products
		}
	});
	return ['cam1001','cam1002'];
};


