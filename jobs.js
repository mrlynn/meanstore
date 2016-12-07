// Jobs
// ====
// The scheduled tasks setup
// and startup script.

var env       = process.env.NODE_ENV || 'development',
    _         = require('lodash'),
    config    = _.merge(require(__dirname + '/../config').global, require(__dirname + '/../config')[env]),
    Agenda    = require('agenda'),
    agenda    = new Agenda({db: {address: 'mongodb://localhost:27017/myApp', collection: 'tasks'}}),
    jobTypes  = process.env.WORKERS ? process.env.WORKERS.split(',') : [],
    db        = require(__dirname + '/mongo'), // Our internal MongoDB module to connect to our app's database
    knex      = require('knex')(require(__dirname + '/../../knexfile')[env]),
    bookshelf = require('bookshelf')(knex),
    models    = require(__dirname + '/../models')(bookshelf);

const dotenv = require('dotenv');
const chalk = require('chalk');
const errorHandler = require('errorhandler');

dotenv.load({ path: '.env.hackathon' });

// Create MongoDB connection pool
db.connect(process.env.MONGODB_URI, function(err) {
  if (err) {
    logger.fatal(err);
    process.exit(1);
  }

  // Start each job processor
  jobTypes.forEach(function(type) {
    require('./jobs/' + type)(agenda, db, models, config);
  });
});

if (jobTypes.length) {
  agenda.start();
}

// Handles graceful stopping of jobs
function graceful() {
  agenda.stop(function() {
    db.close(function(e) {
      if (e) logger.error(e);
      process.exit(0);
    });
  });
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

module.exports = agenda;