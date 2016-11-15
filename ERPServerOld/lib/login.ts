///<reference path="../DefinitelyTyped/node/node.d.ts"/>
///<reference path="../DefinitelyTyped/mongodb/mongodb.d.ts"/>
///<reference path="../DefinitelyTyped/bson/bson.d.ts"/>

var Statics = require("./statics");
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var moment = require("moment");
var bson = require("bson");
var hash = require("./hash");
var util = require("util");
var uuid = require("uuid");
var IP = require("./ip");
var User = require("./../db/user");

class Login {

    public static authenticate(request, response) {
        var userName = request.body.userName.trim();
        var password = request.body.password;
        var rememberMe = JSON.parse(request.body.rememberMe);
        var url = Statics.getMongoDBUrl();

        mongoClient.connect(url, function (err1, db) {
            var userCollection = db.collection("user");
            var sessionCollection = db.collection("session");

            userCollection.findOne({
                userName: userName,
                password: hash.hashString(password)
            }, function (err2, result) {
                // if no error

                if (util.isNullOrUndefined(err2)) {
                    if (!util.isNullOrUndefined(result)) {
                        var newUuid = uuid.v4();
                        var currentDate = moment().format();

                        var sessionData = {
                            sessionId: newUuid,
                            user_id: result._id.toString(),
                            ip: IP.getIP(request),
                            dateCreated: currentDate,
                        };

                        // insert data to session
                        sessionCollection.insertOne(sessionData, function (err3, result3) {
                            if (util.isNullOrUndefined(err3)) {
                                if (rememberMe) {
                                    request.session.maxAge = 1000 * 60 * 60 * 24 * 14;
                                    request.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 14;
                                }

                                User.getPermissionsByUserId(result._id.toString(), (result4)=> {
                                    request.session.sessionId = newUuid;
                                    request.session.userId = result._id.toString();
                                    request.session.permissions = result4;
                                    request.session.userName = userName;

                                    var returnValue = {
                                        error: 0,
                                        redirect: request.protocol + "://" + request.get("Host")
                                    };

                                    response.send(returnValue);
                                });
                            }
                            else {
                                var value4 = {error: 3};
                                response.send(value4); // error on session insert
                            }
                        });
                    }
                    else {
                        // empty result
                        // userName or password mismatch
                        var value = {error: 2};
                        response.send(value);
                    }
                }
                else {
                    // error on find
                    var value = {error: 1};
                    response.send(value);
                }
            });
        });
    }

    public static authenticateFromMobile(request, response) {
        var userName = request.body.userName;
        var password = request.body.password;
        var cordova = request.body.cordova;
        var model = request.body.model;
        var platform = request.body.platform;
        var uuid = request.body.uuid;
        var version = request.body.version;
        var manufacturer = request.body.manufacturer;
        var isVirtual = request.body.isVirtual;
        var serial = request.body.serial;

        var url = Statics.getMongoDBUrl();

        mongoClient.connect(url, function (err1, db) {
            var userCollection = db.collection("user");
            var sessionCollection = db.collection("session");

            userCollection.findOne({
                userName: userName,
                password: hash.hashString(password)
            }, function (err2, result) {
                // if no error

                if (err2 === null) {
                    if (result !== null) {
                        // create session data
                        var newUuid = uuid.v4();
                        var currentDate = moment().format();
                        var deviceInfoData = {
                            "cordova": cordova,
                            "model": model,
                            "platform": platform,
                            "uuid": uuid,
                            "version": version,
                            "manufacturer": manufacturer,
                            "isVirtual": isVirtual,
                            "serial": serial
                        };
                        var sessionData = {
                            sessionId: newUuid,
                            user_id: result._id.toString(),
                            dateCreated: currentDate,
                            deviceInfo: deviceInfoData
                        };

                        // insert data to session
                        sessionCollection.insertOne(sessionData, function (err3, result3) {
                            if (err3 === null) {
                                var value = {userName: userName, session: newUuid, error: 0};
                                response.send(value);
                            }
                            else {
                                var value4 = {error: 3};
                                response.send(value4); // error on session insert
                            }
                        });
                    }
                    else {
                        var value2 = {error: 1};
                        response.send(value2); // empty result
                    }
                }
                else {
                    var value3 = {error: 2};
                    response.send(value3); // error on query user
                }
            });
        });
    }

    static check(request, response, complete: Function = null) {
        var sessionId = request.session.sessionId;

        if (util.isNullOrUndefined(sessionId)) {
            response.redirect("/Login");

            if (complete !== null) {
                complete(false);
            }
        }
        else {
            if (sessionId.length === 0) {
                response.redirect("/Login");

                if (complete !== null) {
                    complete(false);
                }
            }
            else {
                if (complete !== null) {
                    complete(true);
                }
            }
        }
    }

    static checkForAjax(request, response) {
        var sessionId = request.session.sessionId;

        if (util.isNullOrUndefined(sessionId)) {
            response.sendStatus(403);
            return false;
        }
        else {
            if (sessionId.length === 0) {
                response.sendStatus(403);
                return false;
            }

            return true;
        }
    }
}

module.exports = Login;