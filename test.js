var mongoose = require('mongoose');
var Payment = require('./models/payment');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/roundup')

user = { _id: "58122507a849f4c2c3793caf",
  "role": 'visitor',
  "telephone": '',
  "zipcode": '',
  "state": '',
  "city": '',
  "addr2": '',
  "addr1": '',
  "last_name": 'test',
  "first_name": 'test',
  "password": '$2a$05$5sCJxAj1t2lcL/LiV2isfu4CeJIUCvlRA2D2OyJAdMGUrIyMKIHKe',
  "email": 'test@test.com',
  "created": "Thu Oct 27 2016 12:01:56 GMT-0400 (EDT)" }

Payment.find({user: user}, function(err,payments) {
	if (err) {
		console.log("err: " + err);
	}
  console.log(payments);
});
