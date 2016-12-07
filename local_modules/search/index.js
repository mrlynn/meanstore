var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var User = require('../../models/user');
var Order = require('../../models/order');
var User = require('../../models/user');
var Cart = require('../../models/cart');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoSanitize = require('express-mongo-sanitize');
var slug = require('slug')
var Filter = require('bad-words');

module.exports = {
	saveSearch: function(search) {
		filter = new Filter();
		var cooked = filter.clean(search);
		console.log(cooked);
		var url = 'mongodb://localhost:27017/hackathon';
		MongoClient.connect(url, function(err, db) {
			var searchcoll = db.collection('searches');
			var ret = searchcoll.findAndModify(
          	{
	            query: { q: search },
	            update: { $inc: { cnt: 1 }, last: new Date(), cooked: cooked },
	            returnNewDocument: true,
	            upsert: true
          	});
			console.log('ret ' + JSON.stringify(ret));
			MongoClient.close();
		});

	}

}