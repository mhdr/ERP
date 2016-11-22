//<reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts"/>
///<reference path="../nm.d.ts"/>
///<reference path="../common.d.ts"/>

namespace MainBodyProfileChangePassword {
    export var viewModel = {

    };

    export class UI{

        static load(complete:Function)
        {
            $("#divMainBodyChangePassword").velocity("fadeIn",{duration:250});
            complete();
        }

        static bindAll()
        {
            ko.applyBindings(MainBodyProfileChangePassword.viewModel, document.getElementById("mainBody"));
        }

        static unBindAll()
        {
            ko.cleanNode(document.getElementById("mainBody"));
        }
    }
}