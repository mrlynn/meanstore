var Product = require('../models/product');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('../config/config');
var connectionstring = 'mongodb://' + Config.dbhost + ':' + Config.dbport + '/' + Config.dbname;
mongoose.connect(connectionstring);
mongoose.Promise = global.Promise;

products = [];
brands = ['Nikon','Sony','Canon','GoPro','Samsung','Pentax','Lumix','Kodak','Hasselblad','FujiFilm'];
videoresolutions = ['1080p','1080l','720p','1440p','4k','8k'];
imageresolutions = ['42 Megapixels','29 Megapixels','20 Megapixels','18 Megapixels','12 Megapixels','8 Megapixels'];
opticalzoom = ['18mm','20mm','23mm','24mm'];
memorycardtype = ['SD','Micro SD','Memory Stick','Internal Memory'];
var done=0;
for (var i=0; i < 100; i++) {
	var code = 1000 + i;
	var color = faker.commerce.color();
	var materialBrand = faker.commerce.productMaterial();
	memTypeNum = Math.floor((Math.random() * memorycardtype.length-1) + 1);
	typeNum = Math.floor((Math.random() * 8) + 1);
	brandNum = Math.floor((Math.random() * brands.length-1) + 1);
	resNum = Math.floor((Math.random() * imageresolutions.length-1) + 1);
	vresNum = Math.floor((Math.random() * videoresolutions.length-1) + 1);
	ozNum = Math.floor((Math.random() * opticalzoom.length-1) + 1);
	oz = opticalzoom[ozNum];
	memCard = memorycardtype[memTypeNum];
	resolution = imageresolutions[resNum];
	vresolution = videoresolutions[vresNum];
	brand = brands[brandNum];
	imagePath = '/img/' + brand.toLowerCase() + '-camera.jpg'
	var category = 'Camera';
	name = faker.commerce.productName() + ' Camera';
	price = faker.commerce.price();
	product = new Product({
		code: 'cam' + code,
		name: name,
		title: brand + ' ' + faker.commerce.productAdjective() + ' ' + color + ' ' + name,
		description: faker.lorem.sentence(),
		taxable: 'Yes',
		shipable: 'Yes',
		price: price,
		'Product_Group': 'Camera',
		category: 'Camera',
		Attributes: [{
			Name: 'color',
			Value: color
		},{
			Name: 'brand',
			Value: brand
		},{
			Name: "Memory Card Type",
			Value: memCard
		},{
			Name: 'Image Resolution',
			Value: resolution
		},{
			Name: 'Video Resolution',
			Value: vresolution
		},{
			Name: 'Optical Zoom',
			Value: oz
		},{
			Name: 'Price',
			Value: price
		}],
		imagePath: imagePath
	});

	product.save(function(err) {
		if (err) {
			console.log('error: ',err.message);
		}
	});
	done++;
	if (done==100) {
		exit();
	}
}

function exit() {
	mongoose.disconnect();
}
