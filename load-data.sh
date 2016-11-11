#!/bin/sh
node data/data-reset.js
node data/fake-cameras.js
node data/fake-televisions.js
node data/fake-printers.js
node data/fake-refrigerators.js
node data/fake-apparel.js

node data/category-seeder.js
