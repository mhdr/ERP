///<reference path="../DefinitelyTyped/node/node.d.ts"/>

var ipaddr = require('ipaddr.js');
var util = require("util");

class IP{

    static getIP(request, response=null) {
        var ip=ipaddr.process(request.ip).toString();

        if (util.isNullOrUndefined(response))
        {
            return ip;
        }
        else {
            var val={ip:ip,error:0};
            response.send(val);
        }
    }
}

module.exports = IP;