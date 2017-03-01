#!/bin/sh
echo Starting MongoD for the ${NODE_ENV} environment
sudo mongod --config config/mongod-${NODE_ENV}.conf
