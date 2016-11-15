///<reference path="../DefinitelyTyped/node/node.d.ts"/>
///<reference path="../DefinitelyTyped/mongodb/mongodb.d.ts"/>
///<reference path="../DefinitelyTyped/bson/bson.d.ts"/>
///<reference path="../DefinitelyTyped/moment/moment.d.ts"/>

var util = require("util");
var Statics = require("./../lib/statics");
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var moment: moment.MomentStatic = require("moment");
var bson = require("bson");

class User
{
    static getPermissionsByUserId(userId,success) {

        var url = Statics.getMongoDBUrl();

        User.findUserById(userId, (result)=> {
            var value2 = result.permissions;
            success(value2);
        }, (result)=> {

        });
    }

    static findUserById(userId, success, error) {
        var url = Statics.getMongoDBUrl();

        if (userId.length === 0) {
            // userId is empty
            var value = {error: 1};
            error(value);
            return;
        }

        mongoClient.connect(url, (err, db)=> {
            if (err === null) {
                var userCollection = db.collection("user");
                var oId = bson.ObjectId.createFromHexString(userId);

                userCollection.findOne({_id: oId}, (err2, result2)=> {
                    if (err2 === null) {
                        db.close();
                        success(result2);
                    }
                    else {
                        db.close();
                        // error on find
                        var value = {error: 3};
                        error(value);
                    }
                });
            }
            else {
                db.close();
                // error on connect
                var value = {error: 2};
                error(value);
            }
        });
    }
}

module.exports=User;