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

# Aggregate - manual bucketing

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

# aggregate - automatic bucketing

db.products.aggregate([
  {
  $match: {
    "Product_Group": "Television"
  }
  },
 {$unwind: "$Attributes"},
 {$match: {"Attributes.Name": "Screen Size"}},
 {$bucketAuto: {
        groupBy: "$Attributes.Value",
        buckets: 4
      }}
])

# aggregate - automatic bucketing

db.products.aggregate([
  {
  $match: {
    "Product_Group": "Television"
  }
  },
 {$unwind: "$Attributes"},
 {$match: {"Attributes.Name": "Number of Ports"}},
 {$bucketAuto: {
        groupBy: "$Attributes.Value",
        buckets: 4
      }}
])


# aggregate - multiple assert.fail(
  db.products.aggregate([
  {
  $match: {
    "Product_Group": "Television"
  }
  },
  {$unwind: "$Attributes"},
  {
  $facet: {

             "Screen Sizes": [
                   {$match: {"Attributes.Name": "Number of Ports"}},
                    {$bucketAuto: {
                       groupBy: "$Attributes.Value", buckets: 4
                                  }
                    }
               ],

            "Price Ranges": [
                    {$match: {"Attributes.Name": "Price"}},
                    {$bucket: {
                      groupBy: "$Attributes.Value",
                      boundaries: [0, 700, 800, 900, Infinity]
                           }
                    }
               ]
          }
  }
])

var mapFunction1 = function() {
   emit(this.cust_id, this.price);
};
var reduceFunction1 = function(keyCustId, valuesPrices) {
  return Array.sum(valuesPrices);
};

# Charting aggregations


db.events.aggregate(
  [
    { $match: { action: "like" } },
    { $project : { month_liked : { $month : "$when" } } } ,
    { $group : { _id : {month_liked:"$month_liked"} , number : { $sum : 1 } } },
    { $sort : { "_id.month_liked" : 1 } }
  ]
)




