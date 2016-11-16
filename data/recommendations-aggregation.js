// Correctly call the aggregation using a cursor and toArray

var MongoClient = require('mongodb').MongoClient,
  test = require('assert');
MongoClient.connect('mongodb://localhost:27017/hackathon', function(err, db) {
  // Some docs for insertion
  var docs = [{
      title : "this is my title", author : "bob", posted : new Date() ,
      pageViews : 5, tags : [ "fun" , "good" , "fun" ], other : { foo : 5 },
      comments : [
        { author :"joe", text : "this is cool" }, { author :"sam", text : "this is bad" }
      ]}];

  // Create a collection
  var collection = db.collection('aggregation_toArray_example');
  // Insert the docs
  collection.insertMany(docs, {w: 1}, function(err, result) {

    // Execute aggregate, notice the pipeline is expressed as an Array
    var cursor = collection.aggregate([
        { $project : {
          author : 1,
          tags : 1
        }},
        { $unwind : "$tags" },
        { $group : {
          _id : {tags : "$tags"},
          authors : { $addToSet : "$author" }
        }}
      ], { cursor: { batchSize: 1 } });

    // Get all the aggregation results
    cursor.toArray(function(err, docs) {
      test.equal(null, err);
      test.equal(2, docs.length);
      db.close();
    });
  });
});
