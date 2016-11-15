var Statics = require("./statics");
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var moment = require("moment");
var bson = require("bson");
var Login = require("./login");
var Permissions = (function () {
    function Permissions() {
    }
    Permissions.getPermissionsList = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        var url = Statics.getMongoDBUrl();
        mongoClient.connect(url, function (err, db) {
            var permissionsCollection = db.collection("permissions");
            permissionsCollection.find().toArray(function (err, docs) {
                var result = [];
                docs.forEach(function (value, index, array) {
                    var dt = {
                        permissionNumber: docs[index].permissionNumber,
                        permissionFaName: docs[index].permissionFaName
                    };
                    result.push(dt);
                });
                response.send(result);
            });
        });
    };
    return Permissions;
}());
module.exports = Permissions;
//# sourceMappingURL=permissions.js.map