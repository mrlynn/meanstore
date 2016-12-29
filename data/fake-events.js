var Product = require('../models/product');
var User = require('../models/user');
var Event = require('../models/events');
var mongoose = require('mongoose');
var faker = require('faker');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.load({
    path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  logger.log('error','%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

var done = 0;
var actions = ['like', 'view', 'purchase'];
var action = 0;
for (var i = 0; i < 100; i++) {
    User.aggregate([{
        $sample: {
            size: 1
        }
    }, {
        $project: {
            _id: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
        }
    }], function(err, user) {
        if (err) {
            console.log(err);
            return -1;
        }
        if (!user) {
            console.log("user not found");
            return -1;
        }
        Product.aggregate([{
            $sample: {
                size: 1
            }
        }, {
            $project: {
                _id: 1,
                name: 1,
                category: 1,
                Product_Group: 1
            }
        }], function(err, product) {
            if (err || !product) {
                console.log(err);
                return -1;
            }
            action = actions[randInterval(0,actions.length-1)];
            event = new Event({
                namespace: 'products',
                when: faker.date.past(),
                person: {
                    id: user[0]._id,
                    first_name: user[0].first_name,
                    last_name: user[0].last_name,
                    email: user[0].email,
                },
                action: action,
                thing: {
                    type: "product",
                    id: product[0]._id,
                    name: product[0].name,
                    category: product[0].category,
                    Product_Group: product[0].Product_Group
                }
            });
            console.log("Event: " + JSON.stringify(event));
            event.save(function(err,eventId) {
                if (err) {
                    console.log("Error: " + err.message);
                    return -1;
                }
            })
        });
    });
    done++;
    if (done > 300) {
        exit();
    }
}

function randInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}