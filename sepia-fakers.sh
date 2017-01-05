#!/bin/sh
node data/data-reset.js
node data/sepia-roundup-seeder.js
node data/sepia-book-seeder.js
node data/category-seeder.js
node data/fake-events.js
