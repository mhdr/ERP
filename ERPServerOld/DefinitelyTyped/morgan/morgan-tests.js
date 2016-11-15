"use strict";
var morgan = require('morgan');
morgan('combined');
morgan('common');
morgan('short');
morgan('tiny');
morgan(':remote-addr :method :url');
morgan(function (tokens, req, res) {
    return req.method + ' ' + req.url + ' ' + tokens['date'](req, res, 'iso');
});
morgan('combined', {
    buffer: true,
    immediate: true,
    skip: function (req, res) { return res.statusCode < 400; },
    stream: {
        write: function (str) {
            console.log(str);
        }
    }
});
var morgan2 = morgan;
morgan.format('tiny-extended', ':method :url :status :res[content-length] - :response-time ms :user-agent');
var developmentExtendedFormatLine = function (tokens, req, res) {
    var status = res.statusCode
        ? res.statusCode
        : undefined;
    var color = status >= 500 ? 31
        : status >= 400 ? 33
            : status >= 300 ? 36
                : status >= 200 ? 32
                    : 0;
    var fn = developmentExtendedFormatLine.memoizer[color];
    if (!fn) {
        fn = developmentExtendedFormatLine.memoizer[color] = morgan.compile('\x1b[0m:method :url \x1b['
            + color + 'm:status \x1b[0m:response-time ms - :res[content-length]\x1b[0m :user-agent');
    }
    return fn(tokens, req, res);
};
developmentExtendedFormatLine.memoizer = {};
morgan.format('dev-extended', developmentExtendedFormatLine);
//# sourceMappingURL=morgan-tests.js.map