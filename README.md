# MEANStore - MeanMart

An example ecommerce / Retail software solution demonstrating the power and flexibility of MongoDB.

## Installation via Vagrant

MEANStore leverages vagrant to deliver a fully functional virtual environment with MEANStore / MEANMart running.

```
git clone https://github.com/mrlynn/meanstore.git
cd meanstore
vagrant up
```
## Installation via local

```
git clone https://github.com/mrlynn/meanstore.git
cd meanstore
npm install
# unicode doesn't install nicely first pass - try again
npm install unicode
# install faker to generate data
npm install faker
# Generate some data...
node data/fake-refrigerators.js
node data/fake-televisions.js
node data/fake-cameras.js
node data/fake-apparel.js
# Create the categories...
node data/category-seeder.js
# Now run it...
npm run dev
```

## Usage

Once vagrant finishes provisioning, ssh into the instance:

```
vagrant ssh
```

You should find that MongoDB has been installed and is running.  You should also find that a database and a set of collections with test data has been created.

## Screenshots

- ![Main Catalog](https://raw.githubusercontent.com/mrlynn/meanstore/meanmart/public/images/example_1.png){:height="200px"}
- ![Main Catalog](https://raw.githubusercontent.com/mrlynn/meanstore/meanmart/public/images/example_2.png){:height="200px"}
- ![Main Catalog](https://raw.githubusercontent.com/mrlynn/meanstore/meanmart/public/images/example_3.png){:height="200px"}

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

- Version 0.1 - 11/20/2016 - Michael Lynn

## Credits / Contributors

- Michael Lynn <michael.lynn@mongodb.com>

## Next Steps

 * [MongoDB Documentation](http://mongodb.org/)
 * [Read about Schemas](http://learnmongodbthehardway.com/)
 * [Star us on GitHub](https://github.com/mrlynn/meanstore)
 * [Tweet me](http://twitter.com/mlynn)