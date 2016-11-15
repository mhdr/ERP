"use strict";
var crypto_1 = require("crypto");
var Hash = (function () {
    function Hash() {
    }
    Hash.hashString = function (data) {
        var hashedStr = crypto_1.createHash('sha256').update(data).digest("hex");
        return hashedStr;
    };
    Hash.comparePassword = function (plainPassword, hashedPassword) {
        var pass = Hash.hashString(plainPassword);
        if (pass === hashedPassword) {
            return true;
        }
        return false;
    };
    return Hash;
}());
module.exports = Hash;
//# sourceMappingURL=hash.js.map