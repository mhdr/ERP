"use strict";
var express = require('express');
var app = express();
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
express.static.mime.define({
    'application/fx': ['fx']
});
app.use('/static', express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});
app.use(function (err, req, res, next) {
    console.error(err);
    next(err);
});
app.get('/', function (req, res) {
    res.send('hello world');
});
var router = express.Router();
var pathStr = 'test';
var pathRE = /test/;
var path = true ? pathStr : pathRE;
router.get(path);
router.put(path);
router.post(path);
router.delete(path);
router.get(pathStr);
router.put(pathStr);
router.post(pathStr);
router.delete(pathStr);
router.get(pathRE);
router.put(pathRE);
router.post(pathRE);
router.delete(pathRE);
router.use(function (req, res, next) { next(); });
router.route('/users')
    .get(function (req, res, next) {
    var types = req.accepts();
    var type = req.accepts('json');
    type = req.accepts(['json', 'text']);
    type = req.accepts('json', 'text');
    var charsets = req.acceptsCharsets();
    var charset = req.acceptsCharsets('utf-8');
    charset = req.acceptsCharsets(['utf-8', 'utf-16']);
    charset = req.acceptsCharsets('utf-8', 'utf-16');
    var encodings = req.acceptsEncodings();
    var encoding = req.acceptsEncodings('gzip');
    encoding = req.acceptsEncodings(['gzip', 'deflate']);
    encoding = req.acceptsEncodings('gzip', 'deflate');
    var languages = req.acceptsLanguages();
    var language = req.acceptsLanguages('en');
    language = req.acceptsLanguages(['en', 'ja']);
    language = req.acceptsLanguages('en', 'ja');
    res.send(req.query['token']);
});
router.get('/user/:id', function (req, res, next) {
    if (req.params.id == 0)
        next('route');
    else
        next();
}, function (req, res, next) {
    res.render('regular');
});
app.use(function (req, res, next) {
    router(req, res, next);
});
app.use(router);
app.listen(3000);
var next = function () { };
var nextWithArgument = function (err) { };
var http = require('http');
http.createServer(app);
//# sourceMappingURL=express-tests.js.map