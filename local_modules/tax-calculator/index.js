var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var Order = require('../../models/order');
var User = require('../../models/user');

module.exports = {
	calculateTax: function(productId, userId, callback) {

		Product.findById(productId,function(err,product) {
			if (err) {
				return {
					error: 500,
					message: 'Problem retrieving product.'
				}
			}
			if (product.taxable == 'Yes' || product.taxable == true) {
				User.findById(userId, function(err,user) {
					if (err) {
						callback({
							"error": err.message
						},null);
					}
					if (undefined == user) {
						callback({
							"error": "not in our city"
						},null)
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
					console.log('taxamount: ' + taxAmount);
					console.log('priceWithTax: ' + priceWithTax);
					callback(null,{
						productId: productId,
						taxable: product.taxable,
						price: parseFloat(price),
						taxRate: taxRate,
						taxAmount: taxAmount,
						priceWithTax: priceWithTax
					});
				})

			} else {
				callback(null,{

				})
			}
		})
	},
	calculateTaxAll: function(items,userId,callback) {
		var products = [];
		for (var id in items) {
			products.push(items[id]);
		}
		for (var i=0; i<products.length;i++) {
			var cartTaxTotal = 0;
			this.calculateTax(products[i],userId,function(err,results) {
				if (err) {
					console.err("error " + err.message);
					callback(err,null);
					return;
				}
				cartTaxTotal += parseFloat(results.taxAmount);
			});
		};
		var results = {
			taxAmount: parseFloat(cartTaxTotal)
		}
		callback(null,results);
	}
}
