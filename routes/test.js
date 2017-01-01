var Product = require('../models/product');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
const chalk = require('chalk');

dotenv.load({ path: '.env.hackathon' });

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
    Product.aggregate([{
        $match: {
            $and: [{
                $or: [{
                    'category': "Television"
                }, {
                    'category': "television"
                }]
            }, {
                status: {
                    $ne: 'deleted'
                }
            }, {
                $or: [{
                    "inventory.onHand": {
                        $gt: 0
                    }
                }, {
                    "inventory.disableOnZero": false
                }]
            }]
        }
    }], function(err, products) {
        console.log(JSON.stringify(products))
    });
console.log("-----------------------------------")
    // Product.find({}, function(err, products) {
        
    //     console.log(JSON.stringify(products))
    // });
