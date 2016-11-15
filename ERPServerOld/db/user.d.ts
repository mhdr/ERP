/// <reference path="../DefinitelyTyped/node/node.d.ts" />
/// <reference path="../DefinitelyTyped/mongodb/mongodb.d.ts" />
/// <reference path="../DefinitelyTyped/bson/bson.d.ts" />
/// <reference path="../DefinitelyTyped/moment/moment.d.ts" />
declare var util: any;
declare var Statics: any;
declare var mongoClient: any;
declare var assert: any;
declare var moment: moment.MomentStatic;
declare var bson: any;
declare class User {
    static getPermissionsByUserId(userId: any, success: any): void;
    static findUserById(userId: any, success: any, error: any): void;
}
