#!/bin/sh
mongoimport --drop --db=roundup --collection=products --headerline data/sepia-products.csv --type=csv
