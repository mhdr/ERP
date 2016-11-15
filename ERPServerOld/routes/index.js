var Login = require("./../lib/login");
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    Login.check(req, res, function (result) {
        if (result) {
            res.render('index');
        }
    });
});
router.get("/Login", function (req, res, next) {
    res.render("login");
});
router.get("/SignOut", function (request, response, next) {
    request.session.destroy(function (err) {
        if (err)
            return next(err);
        request.session = null;
        response.redirect("/");
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map