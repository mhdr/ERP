/// <reference path="../../../DefinitelyTyped/jquery/index.d.ts" />
/// <reference path="../../../DefinitelyTyped/velocity-animate/index.d.ts" />
/// <reference path="../../../DefinitelyTyped/handlebars/index.d.ts" />
/// <reference path="nm.d.ts" />
/// <reference path="common.d.ts" />
declare var format: any;
declare class UI {
    static bindAll(): void;
    static setMainBodyHeight(): void;
    static initializeSize(): void;
    static window_resize(): void;
    static location_change(): void;
    static renderLocationHash(): void;
}
declare class Template {
    static renderMainBody(data: MainBodyData, onComplete: any): void;
    static renderSideBarHTML(value: SideBarData, onComplete: any): void;
    static renderMainBodyCSS(value: MainBodyCSSData, onComplete: any): void;
    static renderMainBodyJS(value: MainBodyJSData, onComplete: any): void;
    static renderMainBodyHTML(value: MainBodyHTMLData, onComplete: any): void;
    static emptySideBarHTML(onComplete: any): void;
    static emptyMainBodyCSS(): void;
    static emptyMainBodyJS(onComplete: any): void;
}
declare var staticDataIterator: any[];
declare class StaticData {
    static loadIterator(): void;
    static getStaticData(): MainBodyData;
    static sideBarAdminUsersHTML: SideBarData;
    static mainBodyAdminUsersCSS: MainBodyCSSData;
    static mainBodyAdminUsersHTML: MainBodyHTMLData;
    static mainBodyAdminUsersJS: MainBodyJSData;
    static mainBodyAdminUsers: MainBodyData;
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
    static sideBarProfileCPHTML: SideBarData;
    static mainBodyProfileCPCSS: MainBodyCSSData;
    static mainBodyProfileCPHTML: MainBodyHTMLData;
    static mainBodyProfileCPJS: MainBodyJSData;
    static mainBodyProfileCP: MainBodyData;
    static sideBarFormsHTML: SideBarData;
    static mainBodyFormsCSS: MainBodyCSSData;
    static mainBodyFormsHTML: MainBodyHTMLData;
    static mainBodyFormsJS: MainBodyJSData;
    static mainBodyForms: MainBodyData;
    static sideBarAdminMachineryHTML: SideBarData;
    static mainBodyAdminMachineryCSS: MainBodyCSSData;
    static mainBodyAdminMachineryHTML: MainBodyHTMLData;
    static mainBodyAdminMachineryJS: MainBodyJSData;
    static mainBodyAdminMachinery: MainBodyData;
}
interface SideBarData {
    divSideBar: string;
    url: string;
    aSideBar: string;
    liNavBar: string;
}
interface MainBodyCSSData {
    styleId: string;
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
    url: string;
}
interface MainBodyJSData {
    namespace: string;
    scriptId: string;
    url: string;
}
