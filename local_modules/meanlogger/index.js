var Config = require('../../config/config');
var taxConfig = require('../../config/tax-config');
var Product = require('../../models/product');
var User = require('../../models/user');
var Cart = require('../../models/cart');
var Activity = require('../../models/activity');
var Order = require('../../models/order');
var User = require('../../models/user');

module.exports = {
	log: function(activity,msg,user) {
		var activitydoc = {
			user: {
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email
			},
			type: activity,
			message: msg,
			acknowledged: {
				state: 'never'
			}
		}
		var act = new Activity(activitydoc);
		var err = null;
		act.save(act, function(err, data) {
			if (err) {
				console.log("ERROR: " + err.message);
			}
			if (activity=='view')
			return;
		});
	}

}
