/// <reference path="../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts" />
/// <reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts" />
/// <reference path="mainBodyShowUsers.d.ts" />
/// <reference path="mainBodyProfile.d.ts" />
/// <reference path="mainBodyProfileChangeData.d.ts" />
/// <reference path="nm.d.ts" />
/// <reference path="common.d.ts" />
declare var format: any;
declare class UI {
    static bindAll(): void;
    static investigatePermissions(): void;
    static setMainBodyHeight(): void;
    static initializeSize(): void;
    static window_resize(): void;
    static location_change(): void;
    static renderLocationHash(): void;
}
declare class Template {
    static renderMainBody(data: MainBodyData, onComplete: any): void;
    static renderModal(): void;
    static renderSideBarHTML(value: SideBarData, onComplete: any): void;
    static renderMainBodyCSS(value: MainBodyCSSData, onComplete: any): void;
    static renderMainBodyJS(value: MainBodyJSData, onComplete: any): void;
    static renderMainBodyHTML(value: MainBodyHTMLData, onComplete: any): void;
    static emptySideBarHTML(onComplete: any): void;
    static emptyMainBodyCSS(): void;
    static emptyMainBodyJS(onComplete: any): void;
}
declare class StaticData {
    static sideBarShowUsersHTML: SideBarData;
    static mainBodyShowUsersCSS: MainBodyCSSData;
    static mainBodyShowUsersHTML: MainBodyHTMLData;
    static mainBodyShowUsersJS: MainBodyJSData;
    static mainBodyShowUsers: MainBodyData;
    static sideBarProfileHTML: SideBarData;
    static mainBodyProfileCSS: MainBodyCSSData;
    static mainBodyProfileHTML: MainBodyHTMLData;
    static mainBodyProfileJS: MainBodyJSData;
    static mainBodyProfile: MainBodyData;
    static sideBarProfileCDHTML: SideBarData;
    static mainBodyProfileCDCSS: MainBodyCSSData;
    static mainBodyProfileCDHTML: MainBodyHTMLData;
    static mainBodyProfileCDJS: MainBodyJSData;
    static mainBodyProfileCD: MainBodyData;
}
interface SideBarData {
    divSideBar: string;
    cache: string;
    url: string;
    aSideBar: string;
    liNavBar: string;
}
interface MainBodyCSSData {
    styleId: string;
    cache: string;
    url: string;
}
interface MainBodyData {
    SideBar: SideBarData;
    HTML: MainBodyHTMLData;
    CSS: MainBodyCSSData;
    JS: MainBodyJSData;
}
interface MainBodyHTMLData {
    divId: string;
    cache: string;
    url: string;
}
interface MainBodyJSData {
    namespace: string;
    scriptId: string;
    cache: string;
    url: string;
}
declare class BrowserLocation {
    static hasPermission(permissionRequired: number, callback: Function): void;
    static aShowUsers(): void;
    static aShowForms(): void;
    static aProfile(): void;
    static aChangeProfile(): void;
    static aHome(): void;
    static aNewForms(): void;
}
