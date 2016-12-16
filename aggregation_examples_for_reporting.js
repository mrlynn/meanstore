# Approved orders by day by year
# result:
// {
//   "result": [
//     {
//       "_id": {
//         "day": 346,
//         "year": 2016
//       },
//       "totalAmount": 11183,
//       "count": 14
//     },
//     {
//       "_id": {
//         "day": 327,
//         "year": 2016
//       },
//       "totalAmount": 160,
//       "count": 2
//     },
//     ...
db.orders.aggregate([
     {
       $group:
         {
           _id: { day: { $dayOfYear: "$created"}, year: { $year: "$created" } },
           totalAmount: { $sum: "$cart.grandTotal" },
           count: { $sum: 1 }
         }
     }
   ])



# Approved orders grouped by category
# This does not work

db.orders.aggregate([
    {
    	$unwind: {
    		path: "$cart.items"
    	}
        $group:
         {
           _id:  category,
           totalAmount: { $sum: "$cart.grandTotal" },
           count: { $sum: 1 }
         }
     }
   ])


# Unwind orders, carts, items

db.orders.aggregate([
{
	$unwind: {
		path: "$cart.items"
	}
}
])


# Unwind orders, carts, items

db.orders.aggregate([
{
	$unwind: {
		path: "$cart.items"
	}
}
])

# Total Sales by Category


db.orders.aggregate([

])

# 

