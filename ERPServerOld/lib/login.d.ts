/// <reference path="../DefinitelyTyped/node/node.d.ts" />
/// <reference path="../DefinitelyTyped/mongodb/mongodb.d.ts" />
/// <reference path="../DefinitelyTyped/bson/bson.d.ts" />
declare var Statics: any;
declare var mongoClient: any;
declare var assert: any;
declare var moment: any;
declare var bson: any;
declare var hash: any;
declare var util: any;
declare var uuid: any;
declare var IP: any;
declare var User: any;
declare class Login {
    static authenticate(request: any, response: any): void;
    static authenticateFromMobile(request: any, response: any): void;
    static check(request: any, response: any, complete?: Function): void;
    static checkForAjax(request: any, response: any): boolean;
}
