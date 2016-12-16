var Product = require('../models/product');
var Category = require('../models/category');
var mongoose = require('mongoose');
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
var categories = [
	new Category({
		name: 'Round-up',
		slug: 'round-up',
		description: 'Round-up registration and related.',
	})
]
var done = 0;
for (var i = 0; i < categories.length; i++) {
	categories[i].save(function(){
		done++;
		if (done==categories.length) {
			exit();
		}
	})
}

function exit() {
	mongoose.disconnect() 
}
