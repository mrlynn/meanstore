var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Product = require('../../models/product');
var Event = require('../../models/events');
var async = require('async');
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
            async.each(orders, function(order, next) {
            // for (var i = 0; i < orders.length; i++) {
                if (isNaN(parseFloat(order.total/100))) {
                    order.total = 0;
                    // orders[i].total = 0;
                }
                console.log("ORDER: " + JSON.stringify(order))
                stats.totalAmountReceived = (parseFloat(stats.totalAmountReceived) + parseFloat(order.total/100));

                var items = order.cart;
                for (item in items) {
                    var group = items[item].Product_Group
                    stats.itemCount += 1
                    if (items[item].code=='RU201701') {
                            stats.ticketsSold += 1
                    } else {
                        if (items[item].code=='RU201702') {
                                stats.banquetTickets +=1;
                        }
                        if (group == 'APPAREL') {
                            stats.apparelSold += 1
                        } else {
                            if (group == 'DONATION') {
                                stats.donationsAmount = (parseFloat(stats.donationsAmount) + parseFloat(order.total/100));
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
                if (order.status == 'approved') {
                    stats.totalApprovedOrders += 1;
                } else {
                    stats.totalUnApprovedOrders += 1;
                }
            });
            stats.totalAmountReceived = (parseFloat(stats.totalAmountReceived).toFixed(2));
            stats.totalApprovedOrders = parseFloat(stats.totalApprovedOrders).toFixed(0);
            stats.donationsAmount = parseFloat(stats.donationsAmount).toFixed(2);
            stats.donationsCount = parseFloat(stats.donationsCount).toFixed(0);
            stats.totalUnApprovedOrders = parseFloat(stats.totalUnApprovedOrders).toFixed(0);
            stats.ticketsSold = parseFloat(stats.ticketsSold).toFixed(0);
            stats.banquetTickets = parseFloat(stats.banquetTickets).toFixed(0);
            stats.apparelSold = parseFloat(stats.apparelSold).toFixed(0);
            stats.itemCount = parseFloat(stats.itemCount).toFixed(0);
            callback(null, stats);
        })
    }
}
