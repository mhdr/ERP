///<reference path="../DefinitelyTyped/node/node.d.ts"/>

var Login = require("./../lib/login");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    Login.check(req, res,function (result) {
        if (result)
        {
            res.render('index');
        }
    });
});

router.get("/Login", function (req, res, next) {
    res.render("login");
});

router.get("/SignOut", (request, response, next)=> {
    request.session.destroy((err)=> {
        if (err) return next(err);
        // remove session cookie
        request.session=null;
        response.redirect("/");
    });
});

module.exports = router;