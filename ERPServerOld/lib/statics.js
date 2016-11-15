var Statics = (function () {
    function Statics() {
    }
    Statics.getMongoDBUrl = function () {
        var mongoDBUrl = "mongodb://localhost:27017/ERP";
        return mongoDBUrl;
    };
    return Statics;
}());
module.exports = Statics;
//# sourceMappingURL=statics.js.map