///<reference path="../../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../../DefinitelyTyped/velocity-animate/index.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/index.d.ts"/>

namespace NM {

    export interface CallbackDictionary {
        name: string;
        value: any;
    }

    export class Parallel {
        numberOfTasks: number;
        taskCompleted: number;
        callbacks: Array<CallbackDictionary>;
        complete: any;

        constructor(numberOfTasks: number) {
            this.numberOfTasks = numberOfTasks;
            this.taskCompleted = 0;
            this.callbacks = [];
        }

        /**
         * fire when all tasks done
         * @param fn
         */
        setOnComplete(fn: Function) {
            this.complete = fn;
        }

        /**
         * tell Parallel task is done and send the result
         * @param name
         * @param value
         */
        done(name: string, value: any = null) {
            var newValue: CallbackDictionary = {name: name, value: value};
            this.callbacks.push(newValue);
            this.taskCompleted += 1;

            if (this.taskCompleted === this.numberOfTasks) {
                this.complete(this.callbacks);
            }
        }
    }

    export class UI {
        static centerVertically() {

            var elements = $("[data-nm-fn='centerVertically']");

            $(elements).each((index, elem)=> {
                var parameter1 = $(elem).attr("data-nm-outerId");

                if (parameter1 !== undefined && parameter1.length > 0) {
                    var outerElementHeight = $("#" + parameter1).height();
                }
                else {
                    // calculate base on window
                    var outerElementHeight = $(window).height();
                }

                var innerElementHeight = $(elem).height();

                var diff = outerElementHeight - innerElementHeight;
                var marginTop = diff / 2;
                $(elem).css("margin-top", marginTop + "px");
            });
        }

        static centerHorizontally() {

            var elements = $("[data-nm-fn='centerHorizontally']");

            $(elements).each((index, elem)=> {
                var parameter1 = $(elem).attr("data-nm-outerId");

                if (parameter1 !== undefined && parameter1.length > 0) {
                    var outerElementWidth = $("#" + parameter1).width();
                }
                else {
                    // calculate base on window
                    var outerElementWidth = $(window).width();
                }

                var innerElementWidth = $(elem).width();

                var diff = outerElementWidth - innerElementWidth;
                var marginRight = diff / 2;
                $(elem).css("margin-right", marginRight + "px");
            });
        }

        static setHeightToParent() {
            var elements = $("[data-nm-fn='setHeightToParent']");

            $(elements).each((index, elem)=> {
                var parameter1 = $(elem).attr("data-nm-outerId");

                if (parameter1 !== undefined && parameter1.length > 0) {
                    var outerElementHeight = $("#" + parameter1).height();
                }
                else {
                    // calculate base on parent
                    var outerElementHeight = $(elem).parent().height();
                }

                $(elem).height(outerElementHeight);
            });
        }
    }
}