#!/bin/sh
echo "Erase Data..."
node data/data-reset.js
echo "Create cameras..."
node data/fake-cameras.js
echo "Create some users..."
node data/fake-users.js
echo "Create televisions..."
node data/fake-televisions.js
echo "Create some users..."
node data/fake-users.js
echo "Create printers..."
node data/fake-printers.js
echo "Create some users..."
node data/fake-users.js
echo "Create refrigerators..."
node data/fake-refrigerators.js
echo "Create some users..."
node data/fake-users.js
echo "Create apparel..."
node data/fake-apparel.js
echo "Create some more users..."
node data/fake-users.js
echo "all set with products and users... let's add some categories..."

echo "Add categories..."
node data/category-seeder.js
