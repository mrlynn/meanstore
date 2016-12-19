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
        stats.totalAmountReceived = 0;
        stats.ticketsSold = 0;
        stats.banquetTickets = 0;
        stats.apparelSold = 0;
        stats.itemCount = 0;
        // Use connect method to connect to the server
        Order.find({}, function(err, orders) {
            if (err) {
                console.log("error " + err.message);
            }
            for (var i = 0; i < orders.length; i++) {
                var items = orders[i].cart.items;
                for (item in orders[i].cart.items) {
                    var group = orders[i].cart.items[item].item.Product_Group
                    stats.itemCount += 1
                    if (group == 'TICKET') {
                        if (orders[i].cart.items[item].item.code=='RU201701') {
                            stats.ticketsSold += 1
                        } else {
                            if (orders[i].cart.items[item].item.code=='RU201702') {
                                stats.banquetTickets +=1;
                            }
                        }
                    } else {
                        if (group == 'APPAREL') {
                            stats.apparelSold += 1
                        } else {
                            if (group == 'VARPRICE') {
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
                if (orders[i].status == 'approved') {
                    stats.totalApprovedOrders += 1;
                } else {
                    stats.totalUnApprovedOrders += 1;
                }
                stats.totalAmountReceived = (parseFloat(stats.totalAmountReceived) + parseFloat(orders[i].cart.grandTotal));
            }
            stats.totalAmountReceived = (parseFloat(stats.totalAmountReceived).toFixed(2));
            stats.totalApprovedOrders = parseFloat(stats.totalApprovedOrders).toFixed(0);
            stats.donationsAmount = parseFloat(stats.donationsAmount).toFixed(2);
            stats.donationsCount = parseFloat(stats.donationsCount).toFixed(0);
            stats.totalUnApprovedOrders = parseFloat(stats.totalUnApprovedOrders).toFixed(0);
            stats.ticketsSold = parseFloat(stats.ticketsSold).toFixed(0);
            stats.banquetTickets = parseFloat(stats.banquetTickets).toFixed(0);
            stats.apparelSold = parseFloat(stats.apparelSold).toFixed(0);
            stats.itemCount = parseFloat(stats.itemCount).toFixed(0);
            console.log("Stats: " + JSON.stringify(stats));
            callback(null, stats);
        })
    }
    
}
