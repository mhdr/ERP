var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:27017/ERP";
mongoClient.connect(url, function (error, db) {
    assert.equal(null, error);
    db.collection("permissions").drop();
    console.log("permissions collections dropped.");
    var permissionCollection = db.collection("permissions");
    var data = [
        {
            permissionNumber: 1,
            permissionName: "User Management",
            permissionFaName: "مدیریت کاربران",
            order: 1
        },
        {
            permissionNumber: 2,
            permissionName: "Form Management",
            permissionFaName: "مدیریت فرم ها",
            order: 2
        },
        {
            permissionNumber: 3,
            permissionName: "Form Fill",
            permissionFaName: "پرکردن فرم ها",
            order: 3
        }
    ];
    permissionCollection.insertMany(data, function (err, result) {
        db.close();
    });
});
//# sourceMappingURL=permissions.js.map