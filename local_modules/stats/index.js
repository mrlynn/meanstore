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

"use strict";

module.exports = {
    getStats: function(callback) {
        var stats = {};
        stats.totalApprovedOrders = 0;
        stats.donationsAmount = 0;
        stats.donationsCount = 0;
        stats.totalUnApprovedOrders = 0;
        stats.totalAmountReceived = parseFloat(0).toFixed(2);
        stats.ticketsSold = 0;
        stats.apparelSold = 0;
        stats.itemCount = 0;
        // Use connect method to connect to the server
        Order.find({},function(err,orders) {
            if (err) {
                console.log("error " + err.message);
            }
            for (var i = 0; i < orders.length; i++) {
            	stats.totalAmountReceived += parseFloat(orders[i].cart.grandTotal);
                var items = orders[i].cart.items;
                for (item in orders[i].cart.items) {
                	var group = orders[i].cart.items[item].item.Product_Group
                	stats.itemCount +=1
                	if (group=='TICKET') {
                		stats.ticketsSold+=1
                	} else {
                		if (group=='APPAREL') {
                			stats.apparelSold+=1
                		} else {
                			if (group=='VARPRICE') {
                				stats.donationsAmount = (parseFloat(stats.donationsAmount) + parseFloat(orders[i].cart.items[item].itemTotal));
                				stats.donationsCount += 1;
                			}
                		}
                	}
				}
                // for(var j = 0; j < items.length; j++) {
                // 	item = orders[i].cart.items[j];
                // 	stats.itemCount += 1;
                // 	console.log("ITEMS: " + JSON.stringify(item._id));
                // 	console.log("---");
                // }
                if (orders[i].status=='approved') {
                	stats.totalApprovedOrders += 1;
                } else {
                	stats.totalUnApprovedOrders += 1;
                }
                stats.totalAmountReceived = (parseFloat(stats.totalAmountReceived) + parseFloat(orders[i].cart.grandTotal));
            }
            console.log("Stats: " + JSON.stringify(stats));
            callback(null, stats);
        })
    },
}
