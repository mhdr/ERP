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
var https = require("https");
var net = require("net");
var tty = require("tty");
var dgram = require("dgram");
var querystring = require("querystring");
var path = require("path");
var readline = require("readline");
var childProcess = require("child_process");
var cluster = require("cluster");
var os = require("os");
var vm = require("vm");
var string_decoder = require("string_decoder");
var stream = require("stream");
var timers = require("timers");
var buffer_1 = require("buffer");
assert(1 + 1 - 2 === 0, "The universe isn't how it should.");
assert.deepEqual({ x: { y: 3 } }, { x: { y: 3 } }, "DEEP WENT DERP");
assert.equal(3, "3", "uses == comparator");
assert.notStrictEqual(2, "2", "uses === comparator");
assert.notDeepStrictEqual({ x: { y: "3" } }, { x: { y: 3 } }, "uses === comparator");
assert.throws(function () { throw "a hammer at your face"; }, undefined, "DODGED IT");
assert.doesNotThrow(function () {
    var b = false;
    if (b) {
        throw "a hammer at your face";
    }
}, undefined, "What the...*crunch*");
var events_tests;
(function (events_tests) {
    var emitter;
    var event;
    var listener;
    var any;
    {
        var result = void 0;
        result = emitter.addListener(event, listener);
        result = emitter.on(event, listener);
        result = emitter.once(event, listener);
        result = emitter.prependListener(event, listener);
        result = emitter.prependOnceListener(event, listener);
        result = emitter.removeListener(event, listener);
        result = emitter.removeAllListeners();
        result = emitter.removeAllListeners(event);
        result = emitter.setMaxListeners(42);
    }
    {
        var result = void 0;
        result = events.EventEmitter.defaultMaxListeners;
        result = events.EventEmitter.listenerCount(emitter, event);
        result = emitter.getMaxListeners();
        result = emitter.listenerCount(event);
    }
    {
        var result = void 0;
        result = emitter.listeners(event);
    }
    {
        var result = void 0;
        result = emitter.emit(event);
        result = emitter.emit(event, any);
        result = emitter.emit(event, any, any);
        result = emitter.emit(event, any, any, any);
    }
    {
        var result = void 0;
        result = emitter.eventNames();
    }
})(events_tests || (events_tests = {}));
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
fs.mkdtemp('/tmp/foo-', function (err, folder) {
    console.log(folder);
});
var tempDir;
tempDir = fs.mkdtempSync('/tmp/foo-');
fs.watch('/tmp/foo-', function (event, filename) {
    console.log(event, filename);
});
fs.watch('/tmp/foo-', 'utf8', function (event, filename) {
    console.log(event, filename);
});
fs.watch('/tmp/foo-', {
    recursive: true,
    persistent: true,
    encoding: 'utf8'
}, function (event, filename) {
    console.log(event, filename);
});
fs.access('/path/to/folder', function (err) { });
fs.access(Buffer.from(''), function (err) { });
fs.access('/path/to/folder', fs.constants.F_OK | fs.constants.R_OK, function (err) { });
fs.access(Buffer.from(''), fs.constants.F_OK | fs.constants.R_OK, function (err) { });
fs.accessSync('/path/to/folder');
fs.accessSync(Buffer.from(''));
fs.accessSync('path/to/folder', fs.constants.W_OK | fs.constants.X_OK);
fs.accessSync(Buffer.from(''), fs.constants.W_OK | fs.constants.X_OK);
function bufferTests() {
    var utf8Buffer = new Buffer('test');
    var base64Buffer = new Buffer('', 'base64');
    var octets = null;
    var octetBuffer = new Buffer(octets);
    var sharedBuffer = new Buffer(octets.buffer);
    var copiedBuffer = new Buffer(utf8Buffer);
    console.log(Buffer.isBuffer(octetBuffer));
    console.log(Buffer.isEncoding('utf8'));
    console.log(Buffer.byteLength('xyz123'));
    console.log(Buffer.byteLength('xyz123', 'ascii'));
    var result1 = Buffer.concat([utf8Buffer, base64Buffer]);
    var result2 = Buffer.concat([utf8Buffer, base64Buffer], 9999999);
    {
        var buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
        buf.swap16();
        buf.swap32();
        buf.swap64();
    }
    {
        var buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
    }
    {
        var arr = new Uint16Array(2);
        arr[0] = 5000;
        arr[1] = 4000;
        var buf = void 0;
        buf = Buffer.from(arr.buffer);
        buf = Buffer.from(arr.buffer, 1);
        buf = Buffer.from(arr.buffer, 0, 1);
    }
    {
        var buf1 = Buffer.from('buffer');
        var buf2 = Buffer.from(buf1);
    }
    {
        var buf1 = Buffer.from('this is a tést');
        var buf2 = Buffer.from('7468697320697320612074c3a97374', 'hex');
    }
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
    {
        var buffer_2 = new Buffer('123');
        var index = void 0;
        index = buffer_2.indexOf("23");
        index = buffer_2.indexOf("23", 1);
        index = buffer_2.indexOf("23", 1, "utf8");
        index = buffer_2.indexOf(23);
        index = buffer_2.indexOf(buffer_2);
    }
    {
        var buffer_3 = new Buffer('123');
        var index = void 0;
        index = buffer_3.lastIndexOf("23");
        index = buffer_3.lastIndexOf("23", 1);
        index = buffer_3.lastIndexOf("23", 1, "utf8");
        index = buffer_3.lastIndexOf(23);
        index = buffer_3.lastIndexOf(buffer_3);
    }
    {
        var buffer_4 = new Buffer('123');
        var val = void 0;
    }
    {
        var buffer_5 = new Buffer('123');
        var includes = void 0;
        includes = buffer_5.includes("23");
        includes = buffer_5.includes("23", 1);
        includes = buffer_5.includes("23", 1, "utf8");
        includes = buffer_5.includes(23);
        includes = buffer_5.includes(23, 1);
        includes = buffer_5.includes(23, 1, "utf8");
        includes = buffer_5.includes(buffer_5);
        includes = buffer_5.includes(buffer_5, 1);
        includes = buffer_5.includes(buffer_5, 1, "utf8");
    }
    {
        var buffer_6 = new Buffer('123');
        var val = void 0;
    }
    {
        var buffer_7 = new Buffer('123');
        var val = void 0;
    }
    {
        var b_1 = new buffer_1.Buffer('123');
        b_1.writeUInt8(0, 6);
        var sb = new buffer_1.SlowBuffer(43);
        b_1.writeUInt8(0, 6);
    }
    {
        var buffer_8 = new Buffer('123');
        var octets_1 = new Uint8Array(buffer_8.buffer);
    }
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
function simplified_stream_ctor_test() {
    new stream.Readable({
        read: function (size) {
            size.toFixed();
        }
    });
    new stream.Writable({
        write: function (chunk, enc, cb) {
            chunk.slice(1);
            enc.charAt(0);
            cb();
        },
        writev: function (chunks, cb) {
            chunks[0].chunk.slice(0);
            chunks[0].encoding.charAt(0);
            cb();
        }
    });
    new stream.Duplex({
        read: function (size) {
            size.toFixed();
        },
        write: function (chunk, enc, cb) {
            chunk.slice(1);
            enc.charAt(0);
            cb();
        },
        writev: function (chunks, cb) {
            chunks[0].chunk.slice(0);
            chunks[0].encoding.charAt(0);
            cb();
        },
        readableObjectMode: true,
        writableObjectMode: true
    });
    new stream.Transform({
        transform: function (chunk, enc, cb) {
            chunk.slice(1);
            enc.charAt(0);
            cb();
        },
        flush: function (cb) {
            cb();
        },
        read: function (size) {
            size.toFixed();
        },
        write: function (chunk, enc, cb) {
            chunk.slice(1);
            enc.charAt(0);
            cb();
        },
        writev: function (chunks, cb) {
            chunks[0].chunk.slice(0);
            chunks[0].encoding.charAt(0);
            cb();
        }
    });
}
var hmacResult = crypto.createHmac('md5', 'hello').update('world').digest('hex');
{
    var hmac_1;
    (hmac_1 = crypto.createHmac('md5', 'hello')).end('world', 'utf8', function () {
        var hash = hmac_1.read();
    });
}
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
var tlsOpts = {
    host: "127.0.0.1",
    port: 55
};
var tlsSocket = tls.connect(tlsOpts);
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
    http.request({
        agent: false
    });
    http.request({
        agent: agent
    });
    http.request({
        agent: undefined
    });
})(http_tests || (http_tests = {}));
var https_tests;
(function (https_tests) {
    var agent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
        maxSockets: Infinity,
        maxFreeSockets: 256,
        maxCachedSessions: 100
    });
    var agent = https.globalAgent;
    https.request({
        agent: false
    });
    https.request({
        agent: agent
    });
    https.request({
        agent: undefined
    });
})(https_tests || (https_tests = {}));
var tty_tests;
(function (tty_tests) {
    var rs;
    var ws;
    var rsIsRaw = rs.isRaw;
    rs.setRawMode(true);
    var wsColumns = ws.columns;
    var wsRows = ws.rows;
    var isTTY = tty.isatty(1);
})(tty_tests || (tty_tests = {}));
var ds = dgram.createSocket("udp4", function (msg, rinfo) {
});
ds.bind();
ds.bind(41234);
var ai = ds.address();
ds.send(new Buffer("hello"), 0, 5, 5000, "127.0.0.1", function (error, bytes) {
});
ds.send(new Buffer("hello"), 5000, "127.0.0.1");
var querystring_tests;
(function (querystring_tests) {
    {
        var obj = void 0;
        var sep = void 0;
        var eq = void 0;
        var options = void 0;
        var result = void 0;
        result = querystring.stringify(obj);
        result = querystring.stringify(obj, sep);
        result = querystring.stringify(obj, sep, eq);
        result = querystring.stringify(obj, sep, eq);
        result = querystring.stringify(obj, sep, eq, options);
    }
    {
        var str = void 0;
        var sep = void 0;
        var eq = void 0;
        var options = void 0;
        var result = void 0;
        result = querystring.parse(str);
        result = querystring.parse(str, sep);
        result = querystring.parse(str, sep, eq);
        result = querystring.parse(str, sep, eq, options);
    }
    {
        var str = void 0;
        var result = void 0;
        result = querystring.escape(str);
        result = querystring.unescape(str);
    }
})(querystring_tests || (querystring_tests = {}));
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
var readline_tests;
(function (readline_tests) {
    var rl;
    {
        var options = void 0;
        var input = void 0;
        var output = void 0;
        var completer = void 0;
        var terminal = void 0;
        var result = void 0;
        result = readline.createInterface(options);
        result = readline.createInterface(input);
        result = readline.createInterface(input, output);
        result = readline.createInterface(input, output, completer);
        result = readline.createInterface(input, output, completer, terminal);
    }
    {
        var prompt_1;
        rl.setPrompt(prompt_1);
    }
    {
        var preserveCursor = void 0;
        rl.prompt();
        rl.prompt(preserveCursor);
    }
    {
        var query = void 0;
        var callback = void 0;
        rl.question(query, callback);
    }
    {
        var result = void 0;
        result = rl.pause();
    }
    {
        var result = void 0;
        result = rl.resume();
    }
    {
        rl.close();
    }
    {
        var data = void 0;
        var key = void 0;
        rl.write(data);
        rl.write(null, key);
    }
    {
        var stream_1;
        var x = void 0;
        var y = void 0;
        readline.cursorTo(stream_1, x, y);
    }
    {
        var stream_2;
        var dx = void 0;
        var dy = void 0;
        readline.moveCursor(stream_2, dx, dy);
    }
    {
        var stream_3;
        var dir = void 0;
        readline.clearLine(stream_3, dir);
    }
    {
        var stream_4;
        readline.clearScreenDown(stream_4);
    }
})(readline_tests || (readline_tests = {}));
var string_decoder_tests;
(function (string_decoder_tests) {
    var StringDecoder = string_decoder.StringDecoder;
    var buffer = new Buffer('test');
    var decoder1 = new StringDecoder();
    var decoder2 = new StringDecoder('utf8');
    var part1 = decoder1.write(new Buffer('test'));
    var end1 = decoder1.end();
    var part2 = decoder2.write(new Buffer('test'));
    var end2 = decoder1.end(new Buffer('test'));
})(string_decoder_tests || (string_decoder_tests = {}));
childProcess.exec("echo test");
childProcess.spawnSync("echo test");
cluster.fork();
Object.keys(cluster.workers).forEach(function (key) {
    var worker = cluster.workers[key];
    if (worker.isDead()) {
        console.log('worker %d is dead', worker.process.pid);
    }
});
var os_tests;
(function (os_tests) {
    {
        var result = void 0;
        result = os.tmpdir();
        result = os.homedir();
        result = os.endianness();
        result = os.hostname();
        result = os.type();
        result = os.platform();
        result = os.arch();
        result = os.release();
        result = os.EOL;
    }
    {
        var result = void 0;
        result = os.uptime();
        result = os.totalmem();
        result = os.freemem();
    }
    {
        var result = void 0;
        result = os.loadavg();
    }
    {
        var result = void 0;
        result = os.cpus();
    }
    {
        var result = void 0;
        result = os.networkInterfaces();
    }
})(os_tests || (os_tests = {}));
var vm_tests;
(function (vm_tests) {
    {
        var sandbox = {
            animal: 'cat',
            count: 2
        };
        var context = vm.createContext(sandbox);
        console.log(vm.isContext(context));
        var script = new vm.Script('count += 1; name = "kitty"');
        for (var i = 0; i < 10; ++i) {
            script.runInContext(context);
        }
        console.log(util.inspect(sandbox));
        vm.runInNewContext('count += 1; name = "kitty"', sandbox);
        console.log(util.inspect(sandbox));
    }
    {
        var sandboxes = [{}, {}, {}];
        var script_1 = new vm.Script('globalVar = "set"');
        sandboxes.forEach(function (sandbox) {
            script_1.runInNewContext(sandbox);
            script_1.runInThisContext();
        });
        console.log(util.inspect(sandboxes));
        var localVar = 'initial value';
        vm.runInThisContext('localVar = "vm";');
        console.log(localVar);
    }
    {
        var Debug = vm.runInDebugContext('Debug');
        Debug.scripts().forEach(function (script) { console.log(script.name); });
    }
})(vm_tests || (vm_tests = {}));
var timers_tests;
(function (timers_tests) {
    {
        var immediateId = timers.setImmediate(function () { console.log("immediate"); });
        timers.clearImmediate(immediateId);
    }
    {
        var counter = 0;
        var timeout = timers.setInterval(function () { console.log("interval"); }, 20);
        timeout.unref();
        timeout.ref();
        timers.clearInterval(timeout);
    }
    {
        var counter = 0;
        var timeout = timers.setTimeout(function () { console.log("timeout"); }, 20);
        timeout.unref();
        timeout.ref();
        timers.clearTimeout(timeout);
    }
})(timers_tests || (timers_tests = {}));
var errors_tests;
(function (errors_tests) {
    {
        Error.stackTraceLimit = Infinity;
    }
    {
        var myObject = {};
        Error.captureStackTrace(myObject);
    }
})(errors_tests || (errors_tests = {}));
var process_tests;
(function (process_tests) {
    {
        var eventEmitter;
        eventEmitter = process;
    }
})(process_tests || (process_tests = {}));
var c = require("console");
var console_tests;
(function (console_tests) {
    {
        assert(c === console);
    }
})(console_tests || (console_tests = {}));
//# sourceMappingURL=node-tests.js.map