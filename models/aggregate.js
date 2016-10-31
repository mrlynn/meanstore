db.orders.aggregate({ 
$match: { 
status: 'approved' }},{ 'Total': {$sum: { $cart.totalPrice }}})