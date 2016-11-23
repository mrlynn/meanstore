var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var User = require('../../models/user');
var Cart = require('../../models/cart');
var Order = require('../../models/order');
var User = require('../../models/user');

module.exports = {
	calculateTaxReturn: function(cart, userId,callback) {
		cartItems = cart.generateArray();

		this.calculateTaxAll(cart,userId,function(err,results) {
			console.log("Results before shipping " + JSON.stringify(results));
			callback(err,results);
		})
	},
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
					// taxAmount = Math.round((((price * taxRate) * 100) / 100)+0);
					taxAmount = ((price * taxRate) * 100)/100;
					priceWithTax = (parseFloat(price) + parseFloat(taxAmount));

					// callback(null,{
					// 	productId: productId,
					// 	taxable: product.taxable,
					// 	price: parseFloat(price),
					// 	taxRate: taxRate,
					// 	taxAmount: taxAmount,
					// 	priceWithTax: priceWithTax
					// });
					results = {
						productId: productId,
						taxable: product.taxable,
						price: parseFloat(price),
						taxRate: taxRate,
						taxAmount: taxAmount,
						priceWithTax: priceWithTax
					};
					err = null;
					callback(err,results);


				})

			} else {
				callback(null,{

				})
			}
		})
	},
	calculateTaxAll: function(cart,userId,callback) {
		console.log("asdfasdfasdadsf");
		var products = [];
		products = cart.generateArray();
		// for (var id in items) {
		// 	products.push(items[id]);
		// }
		var done = 0
		var cartTaxTotal = 0;
		for (var i=0; i<products.length;i++) {
			var cartTaxTotal = 0;
			this.calculateTax(products[i].item._id,userId,function(err,results) {
				if (err) {
					console.err("error " + err.message);
					callback(err,null);
					return;
				}
				cartTaxTotal += parseFloat(results.taxAmount);
				console.log("Cart Tax Total " + cartTaxTotal);
				done++;
				console.log("d = " + done);
				if (done >= products.length) {
					finishit();
				}
			});
		};
		function finishit() {
			var results = {
				taxAmount: cartTaxTotal
			}
			callback(null,results);
		}
	}
}
