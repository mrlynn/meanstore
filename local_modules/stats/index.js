var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Product = require('../../models/product');
var Order = require('../../models/order');
var User = require('../../models/user');
var Cart = require('../../models/cart');
var Order = require('../../models/order');
var User = require('../../models/user');

module.exports = {
	getStats: function(callback) { 
		var stats = {};
	    // Use connect method to connect to the server
	    MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
	      assert.equal(null, err);
	      var collection = db.collection('orders');
	      collection.count({'status': 'approved'},function(err, items) {
	        console.log("items: " + items);
	        stats.totalApprovedOrders = items;
	        console.log("Stats in app: " + JSON.stringify(stats));
	        db.close();
	        callback(null,stats);
	      });
	    });
	},
}
