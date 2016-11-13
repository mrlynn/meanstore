db.orders.aggregate([
{ $unwind: "$cart.items" }
])

db.orders.aggregate([
{ $unwind: "$cart.items" },
{ $match: { $cart.items: "5825d1870ec3cd4d15d0d9c8" }}
])