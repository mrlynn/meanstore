#
Approved orders by day by year# result:
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
    db.orders.aggregate([{
        $group: {
            _id: {
                day: {
                    $dayOfYear: "$created"
                },
                year: {
                    $year: "$created"
                }
            },
            totalAmount: {
                $sum: "$cart.grandTotal"
            },
            count: {
                $sum: 1
            }
        }
    }])

# Total by month / year

db.orders.aggregate([{
        $group: {
            _id: {
                period: {
                    year: {
                        $year: "$created"
                    },
                    month: {
                        $month: "$created"
                    }
                }
            },
            total: {
                $sum: "$cart.grandTotal"
            }
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

# Approved orders grouped by category# This does not work

db.orders.aggregate([{
    $unwind: {
        path: "$cart.items"
    }
    $group: {
        _id: {
            category: "$cart.items."
        },
        totalAmount: {
            $sum: "$cart.grandTotal"
        },
        count: {
            $sum: 1
        }
    }
}])


# Unwind orders, carts, items

db.orders.aggregate([{
    $unwind: {
        path: "$cart.items"
    }
}])


# Unwind orders, carts, items

db.orders.aggregate([{
    $unwind: {
        path: "$cart.items"
    }
}])

# Total Sales by Category


db.orders.aggregate([

])

#

# Faceted Search Example# top selling product_group


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

db.products.aggregate([{
    $match: {
        "Product_Group": "Television"
    }
}, {
    $unwind: "$Attributes"
}, {
    $match: {
        "Attribute.Name": "Price"
    }
}, {
    $bucket: {
        groupBy: "$Attribute.Value",
        boundaries: [0, 200, 300, 500, 600, 700, 800, Infinity],
    }
}])

# aggregate - automatic bucketing

db.products.aggregate([{
    $match: {
        "Product_Group": "Television"
    }
}, {
    $unwind: "$Attributes"
}, {
    $match: {
        "Attributes.Name": "Screen Size"
    }
}, {
    $bucketAuto: {
        groupBy: "$Attributes.Value",
        buckets: 4
    }
}])

# aggregate - automatic bucketing

db.products.aggregate([{
    $match: {
        "Product_Group": "Television"
    }
}, {
    $unwind: "$Attributes"
}, {
    $match: {
        "Attributes.Name": "Number of Ports"
    }
}, {
    $bucketAuto: {
        groupBy: "$Attributes.Value",
        buckets: 4
    }
}])


# aggregate - multiple assert.fail(
        db.products.aggregate([{
            $match: {
                "Product_Group": "Television"
            }
        }, {
            $unwind: "$Attributes"
        }, {
            $facet: {

                "Screen Sizes": [{
                    $match: {
                        "Attributes.Name": "Number of Ports"
                    }
                }, {
                    $bucketAuto: {
                        groupBy: "$Attributes.Value",
                        buckets: 4
                    }
                }],

                "Price Ranges": [{
                    $match: {
                        "Attributes.Name": "Price"
                    }
                }, {
                    $bucket: {
                        groupBy: "$Attributes.Value",
                        boundaries: [0, 700, 800, 900, Infinity]
                    }
                }]
            }
        }])

        var mapFunction1 = function() {
            emit(this.cust_id, this.price);
        };
        var reduceFunction1 = function(keyCustId, valuesPrices) {
            return Array.sum(valuesPrices);
        };

        # Charting aggregations


        db.events.aggregate(
            [{
                $match: {
                    action: "view"
                }
            }, {
                $project: {
                    month_purchased: {
                        $month: "$when"
                    }
                }
            }, {
                $group: {
                    _id: {
                        month_purchased: "$month_liked"
                    },
                    number: {
                        $sum: 1
                    }
                }
            }, {
                $sort: {
                    "_id.month_purchased": 1
                }
            }]
        )

        # Group by all product groups and provide a count of items in that group

        db.products.aggregate(
            [{
                $group: {
                    _id: "$Product_Group",
                    count: {
                        $sum: 1
                    }
                }
            }, {
                $sort: {
                    _id: 1
                }
            }])


        db.petrolstations.aggregate([{
            $group: {
                _id: "$Provincia",
                count: {
                    $sum: 1
                }
            }
        }, {
            $sort: {
                _id: 1
            }
        }])





        /* main admin stats chart is as follows 

        data: [
            {x: '2016 Q1', tickets: 3, banquet: 7},
            {x: '2016 Q2', tickets: 3, banquet: 4},
            {x: '2016 Q3', tickets: null, banquet: 1},
            {x: '2015 Q4', tickets: 2, banquet: 5},
            {x: '2015 Q3', tickets: 8, banquet: 2},
            {x: '2015 Q2', tickets: 4, banquet: 4}
          ],

          */

        db.events.aggregate([
            $project: {
                "$year":
            }
            $group: {
                {
                    _id: {
                        "$year": "$when",
                        count: {
                            $sum: 1
                        }
                    }
                }
            }

        ])


        db.books.aggregate([{
            "$group": {
                "_id": {
                    "addr": "$addr",
                    "book": "$book"
                },
                "bookCount": {
                    "$sum": 1
                }
            }
        }, {
            "$group": {
                "_id": "$_id.addr",
                "books": {
                    "$push": {
                        "book": "$_id.book",
                        "count": "$bookCount"
                    },
                },
                "count": {
                    "$sum": "$bookCount"
                }
            }
        }, {
            "$sort": {
                "count": -1
            }
        }, {
            "$limit": 2
        }, {
            "$project": {
                "books": {
                    "$slice": ["$books", 2]
                },
                "count": 1
            }
        }])

        /* multiple fields in iid */

        db.events.aggregate([{
            $match: {
                "action": "purchase"
            }
        }, {
            "$group": {
                "_id": {
                    "year": {
                        "$year": "$when"
                    },
                    "month": {
                        "$month": "$when"
                    }
                },
                "count": {
                    "$sum": 1
                }
            }
        }, ])

        /* donut chart example */

        Morris.Donut({
            element: 'donut-example',
            data: [{
                label: "Download Sales",
                value: 12
            }, {
                label: "In-Store Sales",
                value: 30
            }, {
                label: "Mail-Order Sales",
                value: 20
            }]
        });


        db.events.aggregate([{
            $group: {
                "id_": "$action",
                "value": {
                    $sum: 1
                }
            }
        }])

        db.events.aggregate([{
            $group: {
                "id_": "$action",
                "value": {
                    $sum: 1
                }
            }
        }])


        db.products.aggregate([{
            $match: {
                $or: [{
                    "inventory.onHand": {
                        $ge: 0
                    }
                }, {
                    "inventory.disableOnZero": false
                }]
            }
        }])

        db.products.aggregate({
                "$match": {
                    "$and": [{
                        "status": {
                            "$ne": 'deleted'
                        }
                    }, {
                        $or: [{
                            "inventory.onHand": {
                                "$gt": 0
                            }
                        }, {
                            "inventory.disableOnZero": false
                        }]
                    }]
                }
            })



        db.products.aggregate([
            {"$match":{"code":"tel1091"}},
            {"$unwind": "usersBought"}
        ])


        db.users.aggregate([
            {
                $graphLookup: {
                    from: "products",
                    startWith: "$usersBought",
                    connectFromField: "usersBought",
                    connectToField: "_id",
                    as: "othersBought"
                }
            },{$project:{name:1,usersBought:1,othersBought:"$othersBought.name"}}
        ])






        db.users.aggregate( [
            {"$unwind":{"path":"$orders"}},
            {
                $graphLookup: {
                    from: "products.",
                    startWith: "$orders",
                    connectFromField: "orders.productId",
                    connectToField: "_id",
                    maxDepth: 2,
                    as: "otherProducts"
                }
            }
        ] )



Televisions

db.products.aggregate([
	{
		$match: {category: "Television"}
	},
	{
		$facet: {
			price: [
				{
					$bucket: {
						groupBy: "$price",
						boundaries: [0, 200, 699, 1000, 1500],
						default: "Over 1500",
						output: {"count": {$sum: 1}}
					}
				},
				{
					$project: {
						lowerPriceBound: "$_id",
						count: 1,
						_id: 0
					}
				}
			],
			brands: [
				{
					$sortByCount: "$Product_Group"
				},
				{
					$project: {
						brand: "$_id",
						count: 1,
						_id: 0
					}
				}
			]
		}
	}
]).pretty()


use hackathon

db.products.aggregate([
	{
		$match: {category: "Television"}
	},
	{
		$facet: {
			price: [
				{
					$bucket: {
						groupBy: "$price",
						boundaries: [0, 200, 699, 1000, 1500],
						default: "Over 1500",
						output: {"count": {$sum: 1}}
					}
				},
				{
					$project: {
						lowerPriceBound: "$_id",
						count: 1,
						_id: 0
					}
				}
			],
			brands: [
				{
					$sortByCount: "$brand"
				},
				{
					$project: {
						brand: "$_id",
						count: 1,
						_id: 0
					}
				}
			],
			screenSize: [
				{
					$bucketAuto: {
						groupBy: "$Attributes.Resolution",
						buckets: 5
					}
				},
				{
					$project: {
						size: "$_id",
						_id: 0,
						count: 1
					}
				}
			],
			type: [
				{
					$sortByCount: "$Attributes.NumberOfPorts"
				},
				{
					$project: {
						type: "$_id",
						count: 1,
						_id: 0
					}
				}
			],
			screenTechnology: [
				{
					$sortByCount: "$specs.ScreenSize"
				},
				{
					$project: {
						technology: "$_id",
						count: 1,
						_id: 0
					}
				}
			]
		}
	}
])




Find others who purchased the SharedKeyboardAndMouseEventInit

products: {
    _id: ObjectId("58848a779debf63272c3bb1e"),
    name: 'banana',
    usersBought: [ 1, 2, 3, 4 ]
},{
    _id: 'b',
    name: 'apple',
    usersBought: [ 1, 2 ]
}, {
     _id: 'c',
    name: 'pear',
    usersBought: [ 3, 4 ]
}

users: {
    _id: 1,
    name: 'mike'
    purchased: [ a, b, c ]
},{
    _id: 2,
    name: 'kelly',
    purchased: [ b, x, y ]
}

db.products.aggregate([
  { $match: {"_id": ObjectId("58848a779debf63272c3bb1e") } }, // Only look at 
  {
    $graphLookup: {
      from: 'users', // Use the customers collection
      startWith: '$usersBought', // Start looking at the document's `friends` property
      connectFromField: 'usersBought', // A link in the graph is represented by the friends property...
      connectToField: '_id', // ... pointing to another customer's _id property
      maxDepth: 1, // Only recurse one level deep
      as: 'connections' // Store this in the `connections` property
    }
  }
]);

db.users.aggregate( [
         {"$match":{"name":"Lucy"}},
          {"$graphLookup": {
		  from: "users",   /* look up from airports collection */
		  startWith: "$purchased", /* start at Lucys nearest airport */
		  connectFromField: "purchased", /* recurse connecting 'connects' */
		  connectToField: "airport",    /* field to 'airport' field */
		  maxDepth: 2,                  /* stop after recursing twice */
		  depthField: "numFlights",   /* record number of flights */
		  as: "destinations"  /* array containing all expanded documents */
	    }}
	] )
