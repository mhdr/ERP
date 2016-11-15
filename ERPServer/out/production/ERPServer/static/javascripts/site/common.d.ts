/// <reference path="../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts" />
/// <reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts" />
/// <reference path="../../../DefinitelyTyped/bootstrap/bootstrap.d.ts" />
declare var format: any;
declare namespace Site {
    class UI {
        static showLoaderForContent(element: any, top?: number, left?: number): void;
        static hideLoaderForContent(): void;
        static showLoaderForMainBody(): void;
        static hideLoaderForMainBody(): void;
    }
    class Popover {
        static create(msgId: string, popoverId: string, targetId: string): void;
        static remove(popoverId: string): void;
    }
    class SubmitButton {
        static afterClick(id: string): void;
        static afterCompelte(id: string): void;
    }
}
