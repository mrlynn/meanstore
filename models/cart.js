module.exports = function Cart(oldCart) {
	// every call comes with the existing / old cart
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = oldCart.totalPrice || 0;
	// add item to cart
	this.add = function(item, id, price) {
		var storedItem = this.items[id];
		if (!storedItem) {
			// create a new entry
			storedItem = this.items[id] = {item: item, qty: 0, price: 0};
		}
		storedItem.qty++;
		storedItem.price = price * storedItem.qty;
		this.totalQty++;
		this.totalPrice += price;
	};
	// create an array of the items in the cart
	this.generateArray = function() {
		var arr = [];
		for (var id in this.items) {
			arr.push(this.items[id]);
		}
		return arr;
	};
};