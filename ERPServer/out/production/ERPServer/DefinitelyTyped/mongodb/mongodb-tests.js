"use strict";
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var format = require('util').format;
MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
    if (err)
        throw err;
    var collection = db.collection('test_insert');
    collection.insertOne({ a: 2 }, function (err, docs) {
        collection.count(function (err, count) {
            console.log(format("count = %s", count));
        });
        collection.find({}).toArray(function (err, results) {
            console.dir(results);
            db.close();
        });
        collection.stats(function (err, stats) {
            console.log(stats.count + " documents");
        });
    });
});
//# sourceMappingURL=mongodb-tests.js.map