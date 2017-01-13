var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var Order = require('../../models/order');
var User = require('../../models/user');
var Cart = require('../../models/cart');
const dotenv = require('dotenv');
const chalk = require('chalk');


/* 
	Shipping Charges 
	$0 to $50 = $12.00 shipping
	$50.01 to $100 = $14.00
	$100.01 to $250 = $18.50 
*/

module.exports = {
	calculateShipping: function(items, callback) {
		if (!process.env.enableShipping) {
			result = {
				totalShipping: parseFloat(0),
				totalShipable: parseFloat(0)
			};
			callback(null,result); 
		}
		var products = [];
		for (var id in items) {
			products.push(items[id]);
		}
		var totalShipping = 0;
		var totalShipablePrice = 0;
		for (var i=0;i<products.length;i++) {
			//console.log("Product " + i + ": " + JSON.stringify(products[i]));
			if (products[i].shipable=='Yes' || products[i].shipable==true) {
				totalShipablePrice += products[i].price;
			}
		}
		switch(true) {
			case (totalShipablePrice > 1000.01):
				totalShipping = 75
				break;
			case (totalShipablePrice > 750.01):
				totalShipping = 50
				break;
			case (totalShipablePrice > 500.01):
				totalShipping = 40
				break;
			case (totalShipablePrice > 250.01):
				totalShipping = 27.5
				break;
			case (totalShipablePrice > 100.01):
				totalShipping = 18.5
				break;
			case (totalShipablePrice > 50.01):
				totalShipping = 14
				break;
			case (totalShipablePrice > 0):
				totalShipping = 12
				break;
		}
		result = {
			totalShipping: parseFloat(totalShipping),
			totalShipable: parseFloat(totalShipablePrice)
		};
		callback(null,result); 
	}
}
