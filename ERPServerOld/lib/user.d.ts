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
declare var hash: any;
declare var uuid: any;
declare var Login: any;
declare class User {
    static login(data: any, callbacks: any): void;
    static getUsers(request: any, response: any): void;
    static getUser(request: any, response: any): void;
    static insertUser(request: any, response: any): void;
    static editUser(request: any, response: any): void;
    static deleteUser(request: any, response: any): void;
    static changePassword(request: any, response: any): void;
    static getPermissions(request: any, response: any): void;
    static findUserById(userId: any, success: any, error: any): void;
    static setPermissions(request: any, response: any): void;
    static getLastLoginIP(request: any, response: any): void;
}
