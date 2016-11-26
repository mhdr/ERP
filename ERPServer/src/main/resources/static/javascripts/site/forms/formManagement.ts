//<reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts"/>
///<reference path="../nm.d.ts"/>
///<reference path="../common.d.ts"/>

namespace MainBodyFormManagement{
    export let viewModel = {
        temp:ko.observable(false)
    };

    export class UI{
        static load(complete:Function)
        {
            complete();
        }

        static bindAll()
        {
            ko.applyBindings(MainBodyFormManagement.viewModel,document.getElementById("divMainBodyShowFormManagement"))
        }

        static unBindAll()
        {
            ko.cleanNode(document.getElementById("divMainBodyShowFormManagement"));
        }
    }
}