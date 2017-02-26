import * as d3 from 'd3';
var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var User = require('../../models/user');
var Order = require('../../models/order');
var User = require('../../models/user');
var Cart = require('../../models/cart');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/hackathon';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
});

// recommendations = {
// 	similar: {
// 		['582b08b0981bf41f3dda6d21','582b08b0981bf41f3dda6d19','582b08b0981bf41f3dda6d11']
// 	},
// 	trending: {
// 		['582b08b0981bf41f3dda6d21','582b08b0981bf41f3dda6d19','582b08b0981bf41f3dda6d11']
// 	},
// 	popular: {
// 		['582b08b0981bf41f3dda6d21','582b08b0981bf41f3dda6d19','582b08b0981bf41f3dda6d11']
// 	},
// 	alsoViewed: {
// 		['582b08b0981bf41f3dda6d21','582b08b0981bf41f3dda6d19','582b08b0981bf41f3dda6d11']
// 	},
// 	alsoBought: {
// 		['582b08b0981bf41f3dda6d21','582b08b0981bf41f3dda6d19','582b08b0981bf41f3dda6d11']
// 	}
// }

module.exports = {
	GetRelationships: function(userDocument, callback) {
		products = [];
		Product.aggregate([], function(err,prodArray) {
			if (err) {
				console.log(err);
			}
			var similar = []
			for(prod in prodArray) {
				doc = {
					_id: prodArray[prod]._id,
					title: prodArray[prod].title,
					image: prodArray[prod].imagePath,
					code: prodArray[prod].code,
					desc: prodArray[prod].description
				}
				similar.push(doc);
			}
			var numTrending = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
			Product.aggregate([{ $sample: { size: numTrending }}], function(err,prodArray) {
				if (err) {
					console.log(err);
				}
				var trending = []
				for(prod in prodArray) {
					doc = {
						_id: prodArray[prod]._id,
						title: prodArray[prod].title,
						image: prodArray[prod].imagePath,
						code: prodArray[prod].code,
						desc: prodArray[prod].description
					}
					trending.push(doc);
				};
				var numViewed = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
				Product.aggregate([{ $sample: { size: numViewed }}], function(err,prodArray) {
					if (err) {
						console.log(err);
					}
					var viewed = []
					for(prod in prodArray) {
						doc = {
							_id: prodArray[prod]._id,
							title: prodArray[prod].title,
							image: prodArray[prod].imagePath,
							code: prodArray[prod].code,
							desc: prodArray[prod].description
						}
						viewed.push(doc);
					};
					var numPop = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
					Product.aggregate([{ $sample: { size: numViewed }}], function(err,prodArray) {
						if (err) {
							console.log(err);
						}
						var popular = []
						for(prod in prodArray) {
							doc = {
								_id: prodArray[prod]._id,
								title: prodArray[prod].title,
								image: prodArray[prod].imagePath,
								code: prodArray[prod].code,
								desc: prodArray[prod].description
							}
							popular.push(doc);
						};
						recommendations = {
							'similar': similar,
							'trending': trending,
							'viewed': viewed,
							'popular': popular
						}
						//console.log(recommendations);
						callback(null,recommendations);
					});
				});
			});
		});
	}
}