///<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../../DefinitelyTyped/knockout/knockout.d.ts"/>
///<reference path="common.d.ts"/>

$(document).ready(()=> {
    Common.Router.initialize();
    Common.UI.registerKOHandlers();
});



