/// <reference path="../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../DefinitelyTyped/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts" />
/// <reference path="../../../DefinitelyTyped/knockout/knockout.d.ts" />
declare var format: any;
declare namespace ViewModel {
    var sidebar: {
        show_sidebar: KnockoutObservable<boolean>;
        users_show: KnockoutObservable<boolean>;
    };
    var navigationbar: {
        users: KnockoutObservable<boolean>;
        forms: KnockoutObservable<boolean>;
        profile: KnockoutObservable<boolean>;
    };
    var users_show: {
        show_mainbody: KnockoutObservable<boolean>;
    };
}
declare namespace Common {
    interface StaticData {
        html: string;
        sidebar: string;
        js: string;
        css: string;
    }
    interface CallbackDictionary {
        name: string;
        value: any;
    }
    class Parallel {
        numberOfTasks: number;
        taskCompleted: number;
        callbacks: Array<CallbackDictionary>;
        complete: any;
        constructor(numberOfTasks: number);
        setOnComplete(fn: Function): void;
        done(name: string, value?: any): void;
    }
    class Router {
        static initialize(): void;
        static bind(): void;
        static getStaticData(target: string): Common.StaticData;
        static swapSidebarItem(target: any): void;
        static swapNavigationbar(target?: string): void;
        static renderMainBody(target?: string): void;
        static renderSidebar(target?: string): void;
        static renderLocationHash(): void;
    }
    class UI {
        static getLoadingHTML(): string;
        static registerKOHandlers(): void;
    }
}
