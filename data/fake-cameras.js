var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
var faker = require('faker');
mongoose.connect('localhost:27017/mongostore')
products = [];
categories = ['Business','Sports','Cats','City','Abstract','Animals','Food','Nightlife','Technics'];
brands = ['Nikon','Sony','Canon','GoPro','Samsung','Pentax','Panasonic','Kodak','Hasselblad','FujiFilm'];
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
	console.log(typeNum);
	var category = categories[typeNum];
	name = faker.commerce.productName();
	imageFunction = eval('faker.image.' + category.toLowerCase() + '()');
	product = new Product({
		code: code,
		name: name,
		title: faker.commerce.productAdjective() + ' ' + color + ' ' + name,
		description: faker.lorem.sentence(),
		taxable: 'Yes',
		shipable: 'Yes',
		price: faker.commerce.price(),
		productType: materialBrand,
		category: category,
		attributes: [{
			name: 'color',
			value: color
		},{
			name: 'brand',
			value: brand
		},{
			name: "Memory Card Type",
			value: memCard
		},{
			name: 'Image Resolution',
			value: resolution
		},{
			name: 'Video Resolution',
			value: vresolution
		},{
			name: 'Optical Zoom',
			value: oz
		}],
		imagePath: imageFunction
	});
	category = new Category({
		name: category,
		description: null,
		slug: category.toLowerCase()
	})
	category.save(function(err) {
		if (err) {
			console.log('error',err.message);
		}
	})
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
	mongoose.disconnect() 
}
