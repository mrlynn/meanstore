var monthname = months[month];
		var setupdate = { $set : {} };
		var incupdate = { $inc : {} };
		incupdate.$inc['months.' + months[month] + '.sales'] = doc.cart.grandTotal;
		incupdate.$inc['ytd'] = doc.cart.grandTotal;
		console.log("inc: " + JSON.stringify(incupdate));
		db.collection('sales',function(err,collection) {
			if (err) {
				console.log('error ' + error.message);
			}
			collection.update(
				{
					year: year
				},
				
					incupdate
				,
				{
					upsert: true
				}, function(err,result) {
					if (err) {
						console.log("Error " + err.message);
					}
					console.log("RESULT: " + JSON.stringify(result));
			});
		})