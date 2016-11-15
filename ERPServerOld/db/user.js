var util = require("util");
var Statics = require("./../lib/statics");
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var moment = require("moment");
var bson = require("bson");
var User = (function () {
    function User() {
    }
    User.getPermissionsByUserId = function (userId, success) {
        var url = Statics.getMongoDBUrl();
        User.findUserById(userId, function (result) {
            var value2 = result.permissions;
            success(value2);
        }, function (result) {
        });
    };
    User.findUserById = function (userId, success, error) {
        var url = Statics.getMongoDBUrl();
        if (userId.length === 0) {
            var value = { error: 1 };
            error(value);
            return;
        }
        mongoClient.connect(url, function (err, db) {
            if (err === null) {
                var userCollection = db.collection("user");
                var oId = bson.ObjectId.createFromHexString(userId);
                userCollection.findOne({ _id: oId }, function (err2, result2) {
                    if (err2 === null) {
                        db.close();
                        success(result2);
                    }
                    else {
                        db.close();
                        var value = { error: 3 };
                        error(value);
                    }
                });
            }
            else {
                db.close();
                var value = { error: 2 };
                error(value);
            }
        });
    };
    return User;
}());
module.exports = User;
//# sourceMappingURL=user.js.map