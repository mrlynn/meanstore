var User = require('../models/user');
var Product = require('../models/product');
var Ticket = require('../models/ticket');
var taxCalc = require('../local_modules/tax-calculator');
var async = require('async');
var shippingCalc = require('../local_modules/shipping-calculator');
var taxCalc = require('../local_modules/tax-calculator');
var taxConfig = require('../config/tax-config');
"use strict"

module.exports = function Cart(oldCart) {

	/* every call comes with the existing / old cart */
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalTax = oldCart.totalTax || 0;
	this.totalShipping = oldCart.totalShipping || 0;
	this.totalPrice = Number(oldCart.totalPrice) || 0; // Subtotal
	this.grandTotal = Number(oldCart.totalPrice) || 0; // Grandtotal
	this.totalPriceWithTax = Number(oldCart.totalPriceWithTax) || 0; // Total with shipping/tax

	console.log("old cart: " + JSON.stringify(oldCart));

	/* TODO: Figure out how to change the value of this in the cart.add method from within the necessary method calls calculateShipping and calculateTax
	/* add item to cart */
	/* TODO: How do I make a call to calculateTax from my cart.js module without losing "this" */

	this.cartShippingTotal = function() {
		// console.log("Cart Total: " + JSON.stringify(this.items));
		shippingCalc.calculateShippingAll(this.items,function(err,results) {
			if (err) {
				console.log('error :' + err.message);
			}

		})
		this.totalShipping = results.taxShipping;
		// this.totalShipping = results.shippingAmount;
	};
	this.makeRecommendation = function(cart, userId) {
		// look up common pairings for each product in
	}
	this.cartTaxTotal = function(userId) {
		// console.log("Cart Total: " + JSON.stringify(this.items));
		taxCalc.calculateTaxAll(this.items,userId,function(err,results) {
			if (err) {
				console.log('error :' + err.message);
			}
		})
		this.totalTax = results.taxAmount;
		// this.totalShipping = results.shippingAmount;
	};

	this.add = function(item, id, price, option, name, email, type, taxable, shipable, userId) {
		var storedItem = this.items[id];
		var locals = {};
		for(var itemid in oldCart.items) {
	    	if (id==itemid) {
	    		if (oldCart.items[itemid].item.Product_Group=='DONATION') {
	    			console.log("DUPLICATE");
	    			error = {
	    				message: 'Unable to add duplicate donations.  Please clear previous donation before adding another.'
	    			}
	    			return error;
	    		}
	    	}
	    }
		if (!storedItem) {
			// create a new entry
			storedItem = this.items[id + name + email + option] = {item: item, qty: 0, ticket_name: name, ticket_email: email, price: price, option: option, type: type, taxAmount: 0, taxable: taxable, shipable: shipable};
		}
		storedItem.qty++;
		storedItem.price = parseFloat(price);
		// storedItem.itemTotal = Number(price * storedItem.qty).toFixed(2);
		storedItem.itemTotal = Number((price*100) * storedItem.qty);
		console.log("Stored Item Item Total: " + JSON.stringify(storedItem));
// this.totalShipping = result.totalShipping;
// storedItem.taxAmount = result.taxAmount;
		storedItem.type = type;
		if (option!=null) {
			storedItem.option = option;
		}
		if (type=='TICKET') {
			storedItem.ticket_name = name;
			storedItem.ticket_email = email;
		}
		this.totalQty++;
		this.totalPrice += parseFloat(price);
		storedItem.type = type;

		if (taxable=='yes' || taxable==true) {
			storedItem.taxAmount = ((price * taxRate) * 100)/100;
			this.totalTax += ((price * .06) * 100)/100;
		} else {
			storedItem.taxAmount = 0;
			this.totalTax = 0;
		}
		storedItem.priceWithTax = (parseFloat(price) + parseFloat(storedItem.taxAmount));
		storedItem.itemTotal = ((parseFloat(price) * storedItem.qty));
	};

	/* Empty all items from cart */
	//
	this.empty = function() {
		this.items = {};
		this.totalQty = 0;
		this.totalPrice = 0;
		this.totalTax = 0;
		storedItem = {item: {}, qty: 0, price: 0, option: null, ticket_name: '', ticket_email: ''};
	};

	/* Reduce the qty of a specific item in the cart by 1 */
	this.reduce = function(item, id, price, option) {
		var storedItem = this.items[id];
		if (!storedItem) {
			// create a new entry
			storedItem = this.items[id] = {item: item, qty: 0, price: 0, option: null, taxAmount: 0};
		}
		storedItem.qty--;
		storedItem.price = price;
		taxcalc.calculateTax(id,userId,function(err,response) {
			if (err) {
				storedItem.taxAmount=0;
			} else {
				storedItem.taxAmount = response.taxAmount;
			}
			storedItem.itemTotal = Number(price * storedItem.qty);
			storedItem.option = option;
			this.totalQty--;
			this.totalPrice += Number(price);
			if (this.items[id].qty <= 0) {
				delete this.items[id];
			}
			storedItem.itemTotal = Number(price * storedItem.qty);
			if (this.totalQty <= 0) {
				this.totalQty = 0;
				this.items = {}
				this.totalPrice = 0;
				storedItem = {item: {}, qty: 0, price: 0, option: null};
			}
		});

	};

	this.generateObject = function() {
		var obj = {}
		for(var id in this.items) {
			obj = {
				id: id,
				ticket_name: this.items[id].item.ticket_name,
				email: this.items[id].item.ticket_email,
				option: this.items[id].item.option
			}
			return obj;
		}
	}

	/* create an array of the items in the cart */
	this.generateArray = function() {
		var arr = [];
		for (var id in this.items) {
			arr.push(this.items[id]);
		}
		return arr;
	};

	/* calculate cart total, taxes and shipping */
	this.calculateTotals = function(items,user) {

	}

	/* Save Ticket Name and Email */
	this.ticketSale = function(products,user) {
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		if (!products) {
			return
		}

		var item_list = [];
		for (var i = 0, len = products.length; i < len; i++) {
			var itemcode = products[i].item.code;
			var product_id = products[i].item._id;
			var itemgroup = products[i].item.Product_Group;
			var ticket_email = products[i].item.ticket_email;
			var code = products[i].item.code;
			var ticket_name = products[i].item.ticket_name;
			var option = products[i].item.option;
			console.log("OPTION: " + option);
			var dateobj = new Date();
			if (itemgroup == 'TICKET') {
				ticket = new Ticket({
					user:{
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email
					},
					ticket_email: ticket_email,
					ticket_name: ticket_name,
					ticket_type: itemgroup
				})
				ticket.save(function(err,ticket) {
					if (err) {
						res.send('500','Problem saving ticket.');
						console.log('Error Saving Ticket ' + err.message);
					}
				});
				User.findById(user._id, function(err,userdoc) {
					if (err) {
						console.log("Unable to find user " + user._id);
					}
					User.update({_id:user._id},
						{$push:
							{purchased:
								{code: code, purchased: dateobj}
							}
						},function(err, newuserdoc){
					    	if (err) console.log("error " + error.message);
						});
					});
				return ticket;

			} 
		}
	}
};
