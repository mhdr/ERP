///<reference path="../DefinitelyTyped/node/node.d.ts"/>

var util = require("util");
var express = require("express");
var router = express.Router();
var Permissions = require("./../lib/permissions");
var User = require("./../lib/user");
var Login = require("./../lib/login");
var IP = require("./../lib/ip");

router.post("/User/Login", function (request, response,next) {
    Login.authenticateFromMobile(request, response);
});

router.post("/User/GetUsers", function (request, response,next) {
    User.getUsers(request, response);
});

router.post("/User/InsertUser", function (request, response,next) {
    User.insertUser(request, response);
});

router.post("/User/EditUser", function (request, response,next) {
    User.editUser(request, response);
});


router.post("/User/DeleteUser", function (request, response,next) {
    User.deleteUser(request, response);
});

router.post("/User/ChangePassword", function (request, response,next) {
    User.changePassword(request, response);
});

router.post("/Permissions/GetPermissionsList", function (request, response,next) {
    Permissions.getPermissionsList(request, response);
});

router.post("/User/GetPermissions", function (request, response,next) {
    User.getPermissions(request, response);
});

router.post("/User/SetPermissions", function (request, response,next) {
    User.setPermissions(request, response);
});

router.post("/Login/Authenticate", (request, response,next)=> {
    Login.authenticate(request, response);
});

router.post("/User/GetUserIP", (request, response,next)=> {
    IP.getIP(request, response);
});

router.post("/User/GetLastLogin", (request, response,next)=> {
    User.getLastLoginIP(request, response);
});

router.post("/User/GetUser", (request, response,next)=> {
    User.getUser(request, response);
});

module.exports = router;