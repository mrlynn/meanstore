var Product = require('../models/product');
var User = require('../models/user');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;

products = [];
brands = ['Nikon', 'Sony', 'Canon', 'GoPro', 'Samsung', 'Pentax', 'Lumix', 'Kodak', 'Hasselblad', 'FujiFilm'];
videoresolutions = ['1080p', '1080l', '720p', '1440p', '4k', '8k'];
imageresolutions = ['42 Megapixels', '29 Megapixels', '20 Megapixels', '18 Megapixels', '12 Megapixels', '8 Megapixels'];
opticalzoom = ['18mm', '20mm', '23mm', '24mm'];
memorycardtype = ['SD', 'Micro SD', 'Memory Stick', 'Internal Memory'];
var done = 0;

for (var i = 0; i < 100; i++) {
    
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

	var code = 1000 + i;
    var color = faker.commerce.color();
    var materialBrand = faker.commerce.productMaterial();
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
    price = faker.commerce.price();
        cost = Math.floor(Math.random() * price) + (price / 2)  
        product = new Product({
            code: 'cam' + code,
            name: name,
            title: brand + ' ' + faker.commerce.productAdjective() + ' ' + color + ' ' + name,
            description: faker.lorem.sentence(),
            taxable: 'Yes',
            shipable: 'Yes',
            price: price,
            cost: cost,
            'Product_Group': 'Camera',
            category: 'Camera',
            usersBought: usersArray,
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
            for (i = 0; i > usersArray.length; i++) {
                User.update({
                    _id: usersArray[i]._id
                }, {
                    $push: {
                        "purchased": productId._id
                    }
                })
                console.log("Update user " + usersArray[user]._id + ' with product ' + productId._id);
            };
            done++;
            if (done == 100) {
                exit();
            }
        });

    });

}

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
