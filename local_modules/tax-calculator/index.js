var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var Order = require('../../models/order');
var User = require('../../models/user');

module.exports = {
	calculateTax: function(productId, userId, callback) {
		Product.findById(productId,function(err,product) {
			if (err) {
				return res.send(500,'Problem retrieving product.');
			}
			if (product.taxable == 'Yes' || product.taxable == true) {
				User.findById(userId, function(err,user) {
					if (err) {
						callback({
							"error": err.message
						});
					}
					if (!user) {
						callback({
							"error": "not in our city"
						})
					}
					if (user.state == taxConfig.ourStateCode || user.state == taxConfig.ourStateName) {
						taxRate = taxConfig.ourStateTaxRate;
						if (user.city.toLowerCase() == taxConfig.ourCityName.toLowerCase()) {
							taxRate = taxConfig.ourCityTaxRate;
						}
					} else { 
						taxRate = 0;
					}
					var price = Number(product.price).toFixed(2);
					taxAmount = Math.round((((price * taxRate) * 100) / 100)+0);
					priceWithTax = (parseFloat(price) + parseFloat(taxAmount));

					callback(null,{
						productId: productId,
						taxable: product.taxable,
						price: parseFloat(price),
						taxRate: taxRate,
						taxAmount: taxAmount,
						priceWithTax: priceWithTax
					});
				})

			}
		})
	}
}
