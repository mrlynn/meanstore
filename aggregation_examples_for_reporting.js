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

# Total by month/year

db.orders.aggregate([{
	$group:
	{
		_id: { period: { year: { $year: "$created"}, month: { $month: "$created"}}},
		total: { $sum: "$cart.grandTotal" }
	}
}])
// {
//   "result": [
//     {
//       "_id": {
//         "period": {
//           "year": 2016,
//           "month": 12
//         }
//       },
//       "total": 23338.5
//     },
//     {
//       "_id": {
//         "period": {
//           "year": 2016,
//           "month": 11
//         }
//       },
//       "total": 54382
//     }

# Approved orders grouped by category
# This does not work

db.orders.aggregate([
    {
    	$unwind: {
    		path: "$cart.items"
    	}
        $group:
         {
           _id:  {
              category: "$cart.items."
            },
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

# Faceted Search Example
# top selling product_group


db.products.aggregate([{
    $match: {
        $text: {
            $search: "test"
        },
        Product_Group: "Television"
    }
}, {
    $unwind: "$Attributes"
}, {
    $match: {
        "Attributes.Name": "brand"
    }
}, {
    $sortByCount: "$Attributes.Value"
}, {
    $limit: 5
}])



db.products.aggregate([
    {$match: { "Product_Group": "Television"}},
    {$unwind: "$Attributes"},
    {$match: {"Attribute.Name": "Price"}},
    {$bucket: {  
                groupBy: "$Attribute.Value",
               boundaries: [0, 200, 300, 500, 600, 700, 800, Infinity],                                          
              }
    }
])



