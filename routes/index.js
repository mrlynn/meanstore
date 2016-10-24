var express = require('express');
var router = express.Router();

var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err,docs) {
		productChunks = [];
		chunkSize = 3;
		for (var i = 3; i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i,i+chunkSize))
		}
    	res.render('shop/index', { title: 'SEPIA Round-up', products: productChunks });
	});
});

module.exports = router;
