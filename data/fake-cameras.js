var Product = require('../models/product');
var User = require('../models/user');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
const async = require('async');
var winston = require("winston");

var logger = new (winston.createLogger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'hackathon.log' })
    ]
});
dotenv.config({
    path: '.env.hackathon'
});

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  logger.log('error','%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

products = [];
brands = ['Nikon', 'Sony', 'Canon', 'GoPro', 'Samsung', 'Pentax', 'Lumix', 'Kodak', 'Hasselblad', 'FujiFilm'];
videoresolutions = ['1080p', '1080l', '720p', '1440p', '4k', '8k'];
imageresolutions = ['42 Megapixels', '29 Megapixels', '20 Megapixels', '18 Megapixels', '12 Megapixels', '8 Megapixels'];
opticalzoom = ['18mm', '20mm', '23mm', '24mm'];
memorycardtype = ['SD', 'Micro SD', 'Memory Stick', 'Internal Memory'];
product_groups = ['Point and Shoot','DSLR','Box Format','Film Camera','Digital','Point and Shoot'];
var done = 0;

async.times(100, function(i, next) {

    var numUsers = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    User.aggregate([{
        $sample: {
            size: numUsers
        }
    }, {
        $project: {
            _id: 1
        }
    }], function(err, users) {
        if (err) {
            console.log(err);
            return -1;
        }
        if (!users) {
            console.log("users not found");
            return -1;
        }
        var usersArray = [];
        for (user in users) {
            usersArray.push(users[user]._id);
        };
        /* let's get 5 random users to add to the products's purchased array */
        /* This array will be referenced by the recommendation engine        */

    	var code = parseInt(1000 + i);
        console.log("Code " + code);
        var color = faker.commerce.color();
        var materialBrand = faker.commerce.productMaterial();
        pgroup = Math.floor((Math.random() * product_groups.length - 1) + 1);
        product_group = product_groups[pgroup];
        memTypeNum = Math.floor((Math.random() * memorycardtype.length - 1) + 1);
        typeNum = Math.floor((Math.random() * 8) + 1);
        brandNum = Math.floor((Math.random() * brands.length - 1) + 1);
        resNum = Math.floor((Math.random() * imageresolutions.length - 1) + 1);
        vresNum = Math.floor((Math.random() * videoresolutions.length - 1) + 1);
        ozNum = Math.floor((Math.random() * opticalzoom.length - 1) + 1);
        oz = opticalzoom[ozNum];
        memCard = memorycardtype[memTypeNum];
        resolution = imageresolutions[resNum];
        vresolution = videoresolutions[vresNum];
        brand = brands[brandNum];
        imagePath = '/img/' + brand.toLowerCase() + '-camera.jpg'
        var category = 'Camera';
        name = faker.commerce.productName() + ' Camera';
        price = Math.floor((Math.random() * 100000 - 1) + 1);
        cost = Math.floor((Math.random() * price) + (price / 2));
        code = 'cam' + Math.floor(i);
        console.log(code);
        product = new Product({
            code: code,
            inventory: {
                onHand: 10,
                disableAtZero: Math.round(Math.random()) ? true : false,
            },
            name: name,
            title: brand + ' ' + faker.commerce.productAdjective() + ' ' + color + ' ' + name,
            description: faker.lorem.sentence(),
            taxable: 'Yes',
            shippable: 'Yes',
            price: price,
            cost: cost,
            'Product_Group': product_group,
            category: 'Camera',
            usersBought: usersArray,
            sale_attributes: {
                featured: Math.round(Math.random()) ? true : false,
                new: Math.round(Math.random()) ? true : false,
                trending: Math.round(Math.random()) ? true : false,
                sale: Math.round(Math.random()) ? true : false
            },
            Attributes: [{
                Name: 'color',
                Value: color
            }, {
                Name: 'brand',
                Value: brand
            }, {
                Name: "Memory Card Type",
                Value: memCard
            }, {
                Name: 'Image Resolution',
                Value: resolution
            }, {
                Name: 'Video Resolution',
                Value: vresolution
            }, {
                Name: 'Optical Zoom',
                Value: oz
            }, {
                Name: 'Price',
                Value: price
            }],
            imagePath: imagePath,
            likes: ["12d321", "23f122", "123g123", "d03kg231", "123gkdf1", "23easdfsd"]
        });
        product.save(function(err, productId) {
            if (err) {
                console.log('error: ', err.message);
            }
            var i = 0;
            async.each(usersArray, function (user, next) {
                User.update({
                    _id: user
                }, {
                    $push: {
                        "purchased": productId._id
                    }
                });
                i++;
                next();
            });
            done++;
            if (done == 100) {
                exit();
            }
        });

    });
});

function getUsers() {
    console.log("In getUsers");
    var numUsers = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    User.aggregate([{
        $sample: {
            size: numUsers
        }
    }, {
        $project: {
            _id: 1
        }
    }], function(err, users) {
        if (err) {
            console.log(err);
            return -1;
        }
        if (!users) {
            console.log("users not found");
            return -1;
        }
        var usersArray = [];
        for (user in users) {
            usersArray.push(users[user]._id);
        };
        return usersArray;
    });
}

function exit() {
    mongoose.disconnect();
}
