db.orders.aggregate([{
    $match: {
        status: 'approved'
    }
}, {
    'Total': {
        $sum: {
            $cart.totalPrice
        }
    }
}])



db.orders.aggregate(
    [
        { $match: {"status": "approved"} },
        { $group: 
            {
                _id: null,
                "Total": { $sum: "$cart.totalPrice" }
            }
        }
    ]
)