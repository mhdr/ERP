/// <reference path="../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts" />
/// <reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts" />
declare namespace NM {
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
    class UI {
        static centerVertically(): void;
        static centerHorizontally(): void;
        static setHeightToParent(): void;
    }
}
