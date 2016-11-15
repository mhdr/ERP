var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:27017/ERP";
var moment = require("moment");
var Hash = require("../lib/hash");
mongoClient.connect(url, function (error, db) {
    assert.equal(null, error);
    db.collection("user").drop();
    db.collection("session").drop();
    console.log("all collections dropped.");
    var data = {
        userName: "admin",
        password: Hash.hashString("admin"),
        firstName: "ادمین",
        lastName: "ادمین",
        permissions: [
            { permissionNumber: 1 },
            { permissionNumber: 2 },
            { permissionNumber: 3 },
        ],
        dateCreated: moment().format()
    };
    db.collection("user").insertOne(data, function (error2, result) {
        console.log("user Admin created.");
        db.close();
    });
});
//# sourceMappingURL=user.js.map