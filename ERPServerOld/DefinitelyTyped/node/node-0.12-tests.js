"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var assert = require("assert");
var fs = require("fs");
var events = require("events");
var zlib = require("zlib");
var url = require("url");
var util = require("util");
var crypto = require("crypto");
var tls = require("tls");
var http = require("http");
var net = require("net");
var dgram = require("dgram");
var querystring = require("querystring");
var path = require("path");
var readline = require("readline");
var childProcess = require("child_process");
var string_decoder = require("string_decoder");
assert(1 + 1 - 2 === 0, "The universe isn't how it should.");
assert.deepEqual({ x: { y: 3 } }, { x: { y: 3 } }, "DEEP WENT DERP");
assert.equal(3, "3", "uses == comparator");
assert.notStrictEqual(2, "2", "uses === comparator");
assert.throws(function () { throw "a hammer at your face"; }, undefined, "DODGED IT");
assert.doesNotThrow(function () {
    var b = false;
    if (b) {
        throw "a hammer at your face";
    }
}, undefined, "What the...*crunch*");
fs.writeFile("thebible.txt", "Do unto others as you would have them do unto you.", assert.ifError);
fs.write(1234, "test");
fs.writeFile("Harry Potter", "\"You be wizzing, Harry,\" jived Dumbledore.", {
    encoding: "ascii"
}, assert.ifError);
var content, buffer;
content = fs.readFileSync('testfile', 'utf8');
content = fs.readFileSync('testfile', { encoding: 'utf8' });
buffer = fs.readFileSync('testfile');
buffer = fs.readFileSync('testfile', { flag: 'r' });
fs.readFile('testfile', 'utf8', function (err, data) { return content = data; });
fs.readFile('testfile', { encoding: 'utf8' }, function (err, data) { return content = data; });
fs.readFile('testfile', function (err, data) { return buffer = data; });
fs.readFile('testfile', { flag: 'r' }, function (err, data) { return buffer = data; });
var Networker = (function (_super) {
    __extends(Networker, _super);
    function Networker() {
        _super.call(this);
        this.emit("mingling");
    }
    return Networker;
}(events.EventEmitter));
var errno;
fs.readFile('testfile', function (err, data) {
    if (err && err.errno) {
        errno = err.errno;
    }
});
function bufferTests() {
    var utf8Buffer = new Buffer('test');
    var base64Buffer = new Buffer('', 'base64');
    var octets = null;
    var octetBuffer = new Buffer(octets);
    console.log(Buffer.isBuffer(octetBuffer));
    console.log(Buffer.isEncoding('utf8'));
    console.log(Buffer.byteLength('xyz123'));
    console.log(Buffer.byteLength('xyz123', 'ascii'));
    var result1 = Buffer.concat([utf8Buffer, base64Buffer]);
    var result2 = Buffer.concat([utf8Buffer, base64Buffer], 9999999);
    var a;
    a = new Buffer(10);
    if (Buffer.isBuffer(a)) {
        a.writeUInt8(3, 4);
    }
    var b = new Buffer(16);
    var result = b.writeUInt32LE(0, 0);
    result = b.writeUInt16LE(0, 4);
    result = b.writeUInt8(0, 6);
    result = b.writeInt8(0, 7);
    result = b.writeDoubleLE(0, 8);
    b.fill('a').fill('b');
}
url.format(url.parse('http://www.example.com/xyz'));
url.format({
    protocol: 'https',
    host: "google.com",
    pathname: 'search',
    query: { q: "you're a lizard, gary" }
});
var helloUrl = url.parse('http://example.com/?hello=world', true);
assert.equal(helloUrl.query.hello, 'world');
util.inspect(["This is nice"], false, 5);
util.inspect(["This is nice"], { colors: true, depth: 5, customInspect: false });
function stream_readable_pipe_test() {
    var r = fs.createReadStream('file.txt');
    var z = zlib.createGzip();
    var w = fs.createWriteStream('file.txt.gz');
    r.pipe(z).pipe(w);
    r.close();
}
var hmacResult = crypto.createHmac('md5', 'hello').update('world').digest('hex');
function crypto_cipher_decipher_string_test() {
    var key = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]);
    var clearText = "This is the clear text.";
    var cipher = crypto.createCipher("aes-128-ecb", key);
    var cipherText = cipher.update(clearText, "utf8", "hex");
    cipherText += cipher.final("hex");
    var decipher = crypto.createDecipher("aes-128-ecb", key);
    var clearText2 = decipher.update(cipherText, "hex", "utf8");
    clearText2 += decipher.final("utf8");
    assert.equal(clearText2, clearText);
}
function crypto_cipher_decipher_buffer_test() {
    var key = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]);
    var clearText = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4]);
    var cipher = crypto.createCipher("aes-128-ecb", key);
    var cipherBuffers = [];
    cipherBuffers.push(cipher.update(clearText));
    cipherBuffers.push(cipher.final());
    var cipherText = Buffer.concat(cipherBuffers);
    var decipher = crypto.createDecipher("aes-128-ecb", key);
    var decipherBuffers = [];
    decipherBuffers.push(decipher.update(cipherText));
    decipherBuffers.push(decipher.final());
    var clearText2 = Buffer.concat(decipherBuffers);
    assert.deepEqual(clearText2, clearText);
}
var ctx = tls.createSecureContext({
    key: "NOT REALLY A KEY",
    cert: "SOME CERTIFICATE",
});
var blah = ctx.context;
http.createServer().listen(0).close().address();
net.createServer().listen(0).close().address();
var request = http.request('http://0.0.0.0');
request.once('error', function () { });
request.setNoDelay(true);
request.abort();
var http_tests;
(function (http_tests) {
    var code = 100;
    var codeMessage = http.STATUS_CODES['400'];
    var codeMessage = http.STATUS_CODES[400];
    var agent = new http.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
        maxSockets: Infinity,
        maxFreeSockets: 256
    });
    var agent = http.globalAgent;
})(http_tests || (http_tests = {}));
var ds = dgram.createSocket("udp4", function (msg, rinfo) {
});
var ai = ds.address();
ds.send(new Buffer("hello"), 0, 5, 5000, "127.0.0.1", function (error, bytes) {
});
var original = 'http://example.com/product/abcde.html';
var escaped = querystring.escape(original);
console.log(escaped);
var unescaped = querystring.unescape(escaped);
console.log(unescaped);
var path_tests;
(function (path_tests) {
    path.normalize('/foo/bar//baz/asdf/quux/..');
    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
    try {
        path.join('foo', {}, 'bar');
    }
    catch (error) {
    }
    path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile');
    path.resolve('/foo/bar', './baz');
    path.resolve('/foo/bar', '/tmp/file/');
    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
    path.isAbsolute('/foo/bar');
    path.isAbsolute('/baz/..');
    path.isAbsolute('qux/');
    path.isAbsolute('.');
    path.isAbsolute('//server');
    path.isAbsolute('C:/foo/..');
    path.isAbsolute('bar\\baz');
    path.isAbsolute('.');
    path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb');
    path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
    path.dirname('/foo/bar/baz/asdf/quux');
    path.basename('/foo/bar/baz/asdf/quux.html');
    path.basename('/foo/bar/baz/asdf/quux.html', '.html');
    path.extname('index.html');
    path.extname('index.coffee.md');
    path.extname('index.');
    path.extname('index');
    'foo/bar/baz'.split(path.sep);
    'foo\\bar\\baz'.split(path.sep);
    console.log(process.env.PATH);
    process.env.PATH.split(path.delimiter);
    console.log(process.env.PATH);
    process.env.PATH.split(path.delimiter);
    path.parse('/home/user/dir/file.txt');
    path.parse('C:\\path\\dir\\index.html');
    path.format({
        root: "/",
        dir: "/home/user/dir",
        base: "file.txt",
        ext: ".txt",
        name: "file"
    });
})(path_tests || (path_tests = {}));
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.setPrompt("$>");
rl.prompt();
rl.prompt(true);
rl.question("do you like typescript?", function (answer) {
    rl.close();
});
var string_decoder_tests;
(function (string_decoder_tests) {
    var StringDecoder = string_decoder.StringDecoder;
    var buffer = new Buffer('test');
    var decoder = new StringDecoder('utf8');
    var part = decoder.write(new Buffer('test'));
    var end = decoder.end();
})(string_decoder_tests || (string_decoder_tests = {}));
childProcess.exec("echo test");
childProcess.spawnSync("echo test");
//# sourceMappingURL=node-0.12-tests.js.map