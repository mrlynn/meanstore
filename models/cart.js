var User = require('../models/user');
var Ticket = require('../models/ticket');
module.exports = function Cart(oldCart) {
	// every call comes with the existing / old cart
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = Number(oldCart.totalPrice) || 0;
	// add item to cart
	this.add = function(item, id, price, size, name, email,type) {
		var storedItem = this.items[id];
		if (!storedItem) {
			// create a new entry
			storedItem = this.items[id] = {item: item, qty: 0, price: 0, size: 0, type: type};
		}
		storedItem.qty++;
		storedItem.price = price;
		storedItem.type = type;
		if (type=='TICKET') {
			storedItem.ticket_name = name;
			storedItem.ticket_email = email;
		} else {
			if (type=='APPAREL') {
				storedItem.size = size;
			}
		}
		storedItem.itemTotal = Number(price * storedItem.qty);
		this.totalQty++;
		this.totalPrice += Number(price);
	};
	this.empty = function() {
		this.items = {};
		this.totalQty = 0;
		this.totalPrice = 0;
		storedItem = {item: {}, qty: 0, price: 0, size: 0, ticket_name: '', ticket_email: ''};
	};
	this.reduce = function(item, id, price, size) {
		var storedItem = this.items[id];
		if (!storedItem) {
			// create a new entry
			storedItem = this.items[id] = {item: item, qty: 0, price: 0, size: 0};
		}
		storedItem.qty--;
		storedItem.price = price;
		storedItem.itemTotal = Number(price * storedItem.qty);
		storedItem.size = size;
		this.totalQty--;
		this.totalPrice += Number(price);
		if (this.items[id].qty <= 0) {
			delete this.items[id];
		}
		if (this.totalQty <= 0) {
			this.totalQty = 0;
			this.items = {}
			this.totalPrice = 0;
			storedItem = {item: {}, qty: 0, price: 0, size: 0};
		}
	};
	// create an array of the items in the cart
	this.generateArray = function() {
		var arr = [];
		for (var id in this.items) {
			arr.push(this.items[id]);
		}
		return arr;
	};
	this.ticketSale = function(products,user) {
		if (!products) {
			console.log('no products');
			return
		}

		console.log('in ticketSale');
		var item_list = [];
		for (var i = 0, len = products.length; i < len; i++) {			
			console.log(products[i]);
			if (products[i].type == 'TICKET') {
				console.log("Product " + i + ' '+ products[i]);
				ticket = new Ticket({
					user: user,
					ticket_email: products[i].ticket_email,
					ticket_name: products[i].ticket_name,
					ticket_type: products[i].type
				})
				ticket.save(function(err,ticket) {
					if (err) {
						console.log('problem saving ticket');
					}
					return ticket;
				});
			}
		}
	}
};