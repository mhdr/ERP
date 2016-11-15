///<reference path="../DefinitelyTyped/node/node.d.ts"/>

class Statics{
    static getMongoDBUrl()
    {
        var mongoDBUrl = "mongodb://localhost:27017/ERP";
        return mongoDBUrl;
    }
}

module.exports = Statics;