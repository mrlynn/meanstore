module.exports = function Reporting(oldCart) {

this.generateArray = function() {
		var arr = [];
		for (var id in this.items) {
			arr.push(this.items[id]);
		}
		return arr;
};

this.getBalance = function(req, res, next) {
    Payment.aggregate([{
        $unwind: "$transactions"
    }, {
        $group: {
            _id: "$_id",
            amount: {
                $sum: "$records.amount"
            }
        }
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
}
var totalTicketsSold = function(req, res, next) {
    return 99;
}

var totalSales = function(req, res, next) {
    Order.find({}, function(err, order) {
        //req.totalSales

    })
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
