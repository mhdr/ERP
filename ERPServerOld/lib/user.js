var util = require("util");
var Statics = require("./statics");
var mongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var moment = require("moment");
var bson = require("bson");
var hash = require("./hash");
var uuid = require("uuid");
var Login = require("./login");
var User = (function () {
    function User() {
    }
    User.login = function (data, callbacks) {
        var success = callbacks.success;
        var error = callbacks.error;
        var url = Statics.getMongoDBUrl();
        mongoClient.connect(url, function (err1, db) {
            var userCollection = db.collection("user");
            var sessionCollection = db.collection("session");
            userCollection.findOne({
                userName: data.userName,
                password: hash.hashString(data.password)
            }, function (err2, result) {
                if (err2 === null) {
                    if (result !== null) {
                        var newUuid = uuid.v4();
                        var currentDate = moment().format();
                        var deviceInfoData = {
                            "cordova": data.cordova,
                            "model": data.model,
                            "platform": data.platform,
                            "uuid": data.uuid,
                            "version": data.version,
                            "manufacturer": data.manufacturer,
                            "isVirtual": data.isVirtual,
                            "serial": data.serial
                        };
                        var sessionData = {
                            sessionId: newUuid,
                            user_id: result._id.toString(),
                            dateCreated: currentDate,
                            deviceInfo: deviceInfoData
                        };
                        sessionCollection.insertOne(sessionData, function (err3, result3) {
                            if (err3 === null) {
                                var value = { userName: data.userName, session: newUuid, error: 0 };
                                success(value);
                            }
                            else {
                                var value4 = { error: 3 };
                                error(value4);
                            }
                        });
                    }
                    else {
                        var value2 = { error: 1 };
                        error(value2);
                    }
                }
                else {
                    var value3 = { error: 2 };
                    error(value3);
                }
            });
        });
    };
    User.getUsers = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        var url = Statics.getMongoDBUrl();
        mongoClient.connect(url, function (err, db) {
            var userCollection = db.collection("user");
            userCollection.find().toArray(function (err, docs) {
                var result = [];
                docs.forEach(function (value, index, array) {
                    if (value.userName === "admin") {
                        result.splice(index, 1);
                    }
                    else {
                        var newUser = {
                            _id: value._id,
                            userName: value.userName,
                            firstName: value.firstName,
                            lastName: value.lastName,
                            dateCreated: value.dateCreated
                        };
                        result.push(newUser);
                    }
                });
                var finalResult = result.reverse();
                response.send(finalResult);
            });
        });
    };
    User.getUser = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        var userId = request.session.userId;
        User.findUserById(userId, function (result) {
            var value = {
                error: 0,
                _id: result._id,
                userName: result.userName,
                firstName: result.firstName,
                lastName: result.lastName,
                dateCreated: result.dateCreated
            };
            response.send(value);
        }, function (result2) {
            response.send(result2);
        });
    };
    User.insertUser = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        var userName = request.body.userName;
        var password = request.body.password;
        var firstName = request.body.firstName;
        var lastName = request.body.lastName;
        var url = Statics.getMongoDBUrl();
        if (userName.trim().length == 0) {
            response.send({ error: 1 });
            return;
        }
        if (password.length == 0) {
            response.send({ error: 2 });
            return;
        }
        if (password.length < 8) {
            var value = { error: 8 };
            response.send(value);
            return;
        }
        if (firstName.trim().length == 0) {
            response.send({ error: 3 });
            return;
        }
        if (lastName.trim().length == 0) {
            response.send({ error: 4 });
            return;
        }
        var userNameLowerCase = userName.trim().toLowerCase();
        userName = userNameLowerCase;
        mongoClient.connect(url, function (err1, db) {
            var userCollection = db.collection("user");
            userCollection.findOne({ userName: userName }, function (err2, result) {
                if (err2 == null) {
                    if (result != null) {
                        response.send({ error: 5 });
                    }
                    else {
                        var value = {
                            userName: userName,
                            password: hash.hashString(password),
                            firstName: firstName.trim(),
                            lastName: lastName.trim(),
                            dateCreated: moment().format()
                        };
                        userCollection.insertOne(value, function (err3, result3) {
                            if (err3 != null) {
                                response.send({ error: 7 });
                            }
                            else {
                                var value2 = {
                                    result: {
                                        id: result3.insertedId.toString()
                                    },
                                    error: 0
                                };
                                response.send(value2);
                            }
                        });
                    }
                }
                else {
                    response.send({ error: 6 });
                }
            });
        });
    };
    User.editUser = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        if (util.isNullOrUndefined(request.body.userId)) {
            var userId = request.session.userId;
        }
        else {
            var userId = request.body.userId.trim();
        }
        var firstName = request.body.firstName;
        var lastName = request.body.lastName;
        if (util.isNullOrUndefined(userId)) {
            response.send({ error: 6 });
            return;
        }
        if (util.isNullOrUndefined(firstName)) {
            response.send({ error: 1 });
            return;
        }
        if (util.isNullOrUndefined(lastName)) {
            response.send({ error: 2 });
            return;
        }
        var dataToEdit = {
            firstName: firstName.trim(),
            lastName: lastName.trim()
        };
        var url = Statics.getMongoDBUrl();
        if (firstName.trim().length === 0) {
            response.send({ error: 1 });
            return;
        }
        if (lastName.trim().length === 0) {
            response.send({ error: 2 });
            return;
        }
        mongoClient.connect(url, function (err, db) {
            if (err === null) {
                var userCollection = db.collection("user");
                var oId = bson.ObjectId.createFromHexString(userId);
                userCollection.updateOne({ _id: oId }, {
                    $set: {
                        firstName: dataToEdit.firstName,
                        lastName: dataToEdit.lastName
                    }
                }, function (err2, result2) {
                    if (err2 === null) {
                        if (result2.modifiedCount > 0) {
                            var value = { error: 0 };
                            response.send(value);
                        }
                        else {
                            var value = { error: 5 };
                            response.send(value);
                        }
                    }
                    else {
                        var value = { error: 4 };
                        response.send(value);
                    }
                });
            }
            else {
                var value = { error: 3 };
                response.send(value);
            }
        });
    };
    User.deleteUser = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        var userId = request.body.userId.trim();
        var url = Statics.getMongoDBUrl();
        mongoClient.connect(url, function (err1, db) {
            if (err1 == null) {
                var userCollection = db.collection("user");
                var oId = bson.ObjectId.createFromHexString(userId);
                userCollection.findOne({ _id: oId }, function (err2, result2) {
                    if (err2 == null) {
                        if (result2 != null) {
                            userCollection.deleteOne({ _id: oId }, function (err3, result3) {
                                if (err3 == null) {
                                    if (result3 != null) {
                                        if (result3.result.ok === 1) {
                                            var value = { error: 0 };
                                            response.send(value);
                                        }
                                        else {
                                            var value = { error: 6 };
                                            response.send(value);
                                        }
                                    }
                                    else {
                                        var value = { error: 5 };
                                        response.send(value);
                                    }
                                }
                                else {
                                    var value = { error: 4 };
                                    response.send(value);
                                }
                            });
                        }
                        else {
                            var value = { error: 3 };
                            response.send(value);
                        }
                    }
                    else {
                        var value = { error: 2 };
                        response.send(value);
                    }
                });
            }
            else {
                var value = { error: 1 };
                response.send(value);
            }
        });
    };
    User.changePassword = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        var userId = request.body.userId.trim();
        var password = request.body.password;
        var url = Statics.getMongoDBUrl();
        if (password.length < 8) {
            var value = { error: 1 };
            response.send(value);
            return;
        }
        mongoClient.connect(url, function (err, db) {
            if (err === null) {
                var userCollection = db.collection("user");
                var oId = bson.ObjectId.createFromHexString(userId);
                userCollection.updateOne({ _id: oId }, {
                    $set: {
                        password: hash.hashString(password)
                    }
                }, function (err2, result2) {
                    if (err2 === null) {
                        if (result2.modifiedCount > 0) {
                            var value = { error: 0 };
                            response.send(value);
                        }
                        else {
                            var value = { error: 4 };
                            response.send(value);
                        }
                    }
                    else {
                        var value = { error: 3 };
                        response.send(value);
                    }
                });
            }
            else {
                var value = { error: 2 };
                response.send(value);
            }
        });
    };
    User.getPermissions = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        if (util.isNullOrUndefined(request.body.userId)) {
            var userId = request.session.userId;
        }
        else {
            var userId = request.body.userId.trim();
        }
        if (util.isNullOrUndefined(userId)) {
            var value = { error: 1 };
            response.send(value);
            return;
        }
        var userId = userId.trim();
        var url = Statics.getMongoDBUrl();
        if (userId.length === 0) {
            var value = { error: 1 };
            response.send(value);
            return;
        }
        User.findUserById(userId, function (result) {
            if (result !== null) {
                var value2 = result.permissions;
                if (util.isNullOrUndefined(value2)) {
                    var value3 = { error: 5 };
                    response.send(value3);
                }
                else {
                    var value4 = { error: 0, result: value2 };
                    response.send(value4);
                }
            }
            else {
                var value = { error: 2 };
                response.send(value);
            }
        }, function (result) {
            var value = { error: 3 };
            response.send(value);
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
    User.setPermissions = function (request, response) {
        if (!Login.checkForAjax(request, response)) {
            return;
        }
        var userId = request.body.userId.trim();
        var permissions = JSON.parse(request.body.permissions);
        if (util.isNullOrUndefined(userId)) {
            var value = { error: 1 };
            response.send(value);
            return;
        }
        if (util.isNullOrUndefined(permissions)) {
            var value = { error: 2 };
            response.send(value);
            return;
        }
        var oId = bson.ObjectId.createFromHexString(userId);
        var url = Statics.getMongoDBUrl();
        mongoClient.connect(url, function (err, db) {
            if (util.isNullOrUndefined(err)) {
                var userCollection = db.collection("user");
                userCollection.updateOne({ _id: oId }, { $unset: { permissions: null } }, function (err2, result2) {
                    if (util.isNullOrUndefined(err2)) {
                        var length = permissions.length;
                        if (length > 0) {
                            var permArray = [];
                            for (var i = 0; i < length; i++) {
                                var perm = parseInt(permissions[i]);
                                var permObj = { permissionNumber: perm };
                                permArray.push(permObj);
                            }
                            userCollection.updateOne({ _id: oId }, { $set: { permissions: permArray } }, function (err3, result3) {
                                if (util.isNullOrUndefined(err3)) {
                                    var value = { error: 0 };
                                    response.send(value);
                                }
                                else {
                                    var value = { error: 5 };
                                    response.send(value);
                                }
                            });
                        }
                        else {
                            var value = { error: 0 };
                            response.send(value);
                        }
                    }
                    else {
                        var value = { error: 4 };
                        response.send(value);
                    }
                });
            }
            else {
                var value = { error: 3 };
                response.send(value);
            }
        });
    };
    User.getLastLoginIP = function (request, response) {
        var url = Statics.getMongoDBUrl();
        mongoClient.connect(url, function (err, db) {
            if (util.isNullOrUndefined(err)) {
                var userId = request.session.userId;
                var sessionId = request.session.sessionId;
                var sessionCollection = db.collection("session");
                sessionCollection.find({ user_id: userId }).sort({ _id: -1 }).limit(2).toArray(function (err2, result2) {
                    if (util.isNullOrUndefined(err2)) {
                        if (result2.length === 2) {
                            if (sessionId === result2[0].sessionId) {
                                var ip = result2[1].ip;
                                var loginDate = result2[1].dateCreated;
                            }
                            else {
                                var ip = result2[0].ip;
                                var loginDate = result2[0].dateCreated;
                            }
                            var value = { error: 0, ip: ip, loginDate: loginDate };
                            response.send(value);
                        }
                        else {
                            var value2 = { error: 3 };
                            response.send(value2);
                        }
                    }
                    else {
                        var value2 = { error: 2 };
                        response.send(value2);
                    }
                });
            }
            else {
                var value = { error: 1 };
                response.send(value);
            }
        });
    };
    return User;
}());
module.exports = User;
//# sourceMappingURL=user.js.map