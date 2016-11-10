#!/bin/sh
mongo localhost:27017/roundup --eval "db.products.remove({})"
mongo localhost:27017/roundup --eval "db.categories.remove({})"
node data/sepia-roundup-seeder.js
node data/sepia-roundup-category-seeder.js
