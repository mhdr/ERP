/// <reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts" />
/// <reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../nm.d.ts" />
/// <reference path="../common.d.ts" />
declare namespace MainBodyFormManagement {
    let viewModel: {
        temp: KnockoutObservable<boolean>;
    };
    class UI {
        static load(complete: Function): void;
        static bindAll(): void;
        static unBindAll(): void;
    }
}
