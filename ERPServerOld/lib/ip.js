var ipaddr = require('ipaddr.js');
var util = require("util");
var IP = (function () {
    function IP() {
    }
    IP.getIP = function (request, response) {
        if (response === void 0) { response = null; }
        var ip = ipaddr.process(request.ip).toString();
        if (util.isNullOrUndefined(response)) {
            return ip;
        }
        else {
            var val = { ip: ip, error: 0 };
            response.send(val);
        }
    };
    return IP;
}());
module.exports = IP;
//# sourceMappingURL=ip.js.map