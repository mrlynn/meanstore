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

## API

MEANStore comes complete with an api that enables you to query, and manage the MongoDB database.  Should you want to review the internal data structures to discover how one might build a product catalog using MongoDB's document-based data storage methodology, a great way to start is by using Postman.  With Postman, you can construct requests quickly, save them for later use and analyze the responses sent by the API. Postman can dramatically cut down the time required to test and develop APIs. Postman adapts itself for individual developers, small teams or big organizations equally well.

To leverage postman, once you've gotten it installed, simply load the url for the API into postman.  For example, to review the products collection if you're using the vagrant-based install, use the following url in postman:

```
http://localhost:30000/api/products
```

This will expose the entire product catalog collection.

```
[
  {
    "_id": "584aecaaf580422022aea4fb",
    "code": "ref1099",
    "name": "Generic Plastic Computer Refrigerator",
    "title": "Intelligent IVORY Generic Plastic Computer Refrigerator",
    "description": "Est enim aut.",
    "taxable": true,
    "shipable": true,
    "price": 73300,
    "Product_Group": "Refrigerator",
    "category": "Refrigerator",
    "imagePath": "/img/samsung-refrigerator.jpg",
    "__v": 0,
    "salesYearMonth": [],
    "salesYTD": [],
    "usersBought": [],
    "categories": [],
    "update": "2016-12-09T17:40:58.033Z",
    "created": "2016-12-09T17:40:58.033Z",
    "options": [],
    "Attributes": [],
    "likes": []
  },
  ...
  ```

## Screenshots

- ![Main Catalog](https://raw.githubusercontent.com/mrlynn/meanstore/meanmart/public/images/example_1.png)
- ![Main Catalog](https://raw.githubusercontent.com/mrlynn/meanstore/meanmart/public/images/example_2.png)
- ![Main Catalog](https://raw.githubusercontent.com/mrlynn/meanstore/meanmart/public/images/example_3.png)

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
 * [Star us on GitHub](https://github.com/mrlynn/meanstore)
 * [Tweet me](http://twitter.com/mlynn)