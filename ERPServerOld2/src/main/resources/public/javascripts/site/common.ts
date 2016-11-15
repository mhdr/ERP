///<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../../DefinitelyTyped/knockout/knockout.d.ts"/>

window['format'];
var format: any;

namespace ViewModel {

    export var sidebar = {
        show_sidebar: ko.observable(false),
        users_show: ko.observable(false),
    };

    export var navigationbar = {
        users: ko.observable(false),
        forms: ko.observable(false),
        profile: ko.observable(false),
    };

    export var users_show = {
        show_mainbody: ko.observable(false),
    }
}

namespace Common {

    export interface StaticData {
        html: string,
        sidebar: string,
        js: string,
        css: string
    }

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

    export class Router {

        static initialize() {
            Common.Router.renderLocationHash();
            Common.Router.bind();

            ko.applyBindings(ViewModel.navigationbar, document.getElementById("topMenu"));
        }

        static bind() {
            $(window).bind("hashchange", function () {
                Common.Router.renderLocationHash();
            });
        }

        static getStaticData(target:string):Common.StaticData
        {
            var result:Common.StaticData;

            switch (target){
                case "users_show":

                    result={
                        sidebar:"/hbs/sidebar/users.hbs",
                        html:"/hbs/mainBody/users/show.hbs",
                        css:"/stylesheets/site/users/show.min.css",
                        js:"/javascripts/site/users/show.min.js"
                    };
                    break;
                default:
                    result={
                        sidebar:"",
                        html:"",
                        css:"",
                        js:""
                    };
            }

            return result;
        }

        static swapSidebarItem(target) {
            var viewModel = ViewModel.sidebar;

            for (var key in viewModel) {
                var fn1 = viewModel[key];
                fn1(false);
            }

            var fn2 = viewModel[target];
            fn2(true);
        }

        static swapNavigationbar(target = "") {
            var viewModel = ViewModel.navigationbar;

            for (var key in viewModel) {
                var fn1 = viewModel[key];
                fn1(false);
            }

            if (target !== "") {
                var fn2 = viewModel[target];
                fn2(true);
            }
        }

        static renderMainBody(target = "") {

            ko.cleanNode(document.getElementById("mainBody"));
            $("#mainBody").empty();

            if (target.length === 0) {
                return;
            }

            var url = Common.Router.getStaticData(target).html;

            $.ajax({
                url: url,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#mainBody").html(data);

                    var cssUrl=Common.Router.getStaticData(target).css;
                    var jsUrl=Common.Router.getStaticData(target).js;

                    $.ajax({
                        url:cssUrl,
                        method:"GET",
                        dataType: 'text',
                        success:function (data, textStatus, jqXHR) {
                            var css=format("<style>{0}</style>",data);
                            $("#mainBody div:first").append(css)
                        }
                    });

                    $.ajax({
                        url:jsUrl,
                        method:"GET",
                        dataType: 'text',
                        success:function (data, textStatus, jqXHR) {
                            var css=format("<script>{0}</script>",data);
                            $("#mainBody div:first").append(css)
                        }
                    });

                }
            })
        }

        static renderSidebar(target = "") {
            $("#sideBar").empty();

            if (target.length === 0) {
                return;
            }

            var url = Common.Router.getStaticData(target).sidebar;

            $.ajax({
                url: url,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#sideBar").html(data);
                    ko.cleanNode(document.getElementById("sideBar"));
                    ko.applyBindings(ViewModel.sidebar, document.getElementById("sideBar"));
                    Common.Router.swapSidebarItem(target);
                    ViewModel.sidebar.show_sidebar(true);
                }
            })
        }

        static  renderLocationHash() {
            var hash = window.location.hash;

            switch (hash) {
                case "":
                    Common.Router.swapNavigationbar();
                    Common.Router.renderSidebar();
                    Common.Router.renderMainBody();
                    break;
                case "#":
                    Common.Router.swapNavigationbar();
                    Common.Router.renderSidebar();
                    Common.Router.renderMainBody();
                    break;
                case "#Users":
                    Common.Router.swapNavigationbar("users");
                    Common.Router.renderSidebar("users_show");
                    Common.Router.renderMainBody("users_show");
                    break;
                case "#Forms":
                    Common.Router.swapNavigationbar("forms");
                    Common.Router.renderSidebar();
                    Common.Router.renderMainBody();
                    break;
                case "#Profile":
                    Common.Router.swapNavigationbar("profile");
                    Common.Router.renderSidebar();
                    Common.Router.renderMainBody();
                    break;
                default:

                    break;
            }
        }
    }

    export class UI
    {
        static getLoadingHTML()
        {
            var html="<div class='shaft-load2'>" +
            "<div class='shaft1'></div>" +
            "<div class='shaft2'></div>" +
            "<div class='shaft3'></div>" +
            "<div class='shaft4'></div>" +
            "<div class='shaft5'></div>" +
            "<div class='shaft6'></div>" +
            "<div class='shaft7'></div>" +
            "<div class='shaft8'></div>" +
            "<div class='shaft9'></div>" +
            "<div class='shaft10'></div>" +
            "</div>";

            return html;
        }

        static registerKOHandlers()
        {
            ko.bindingHandlers.fadeIn = {
                init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    if (!$(element).hasClass("hidden"))
                    {
                        $(element).addClass("hidden");
                    }

                    var duration = allBindings.get('fadeInDuration') || 400; // 400ms is default duration unless otherwise specified

                    $(element).css("-moz-animation-duration",duration+"ms");
                    $(element).css("-webkit-animation-duration",duration+"ms");
                    $(element).css("animation-duration",duration+"ms");
                    $(element).css("-o-animation-duration",duration+"ms");
                },
                update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var value = valueAccessor();
                    var valueUnwrapped = ko.unwrap(value);

                    // Now manipulate the DOM element
                    if (valueUnwrapped == true)
                    {
                        $(element).removeClass("hidden");
                        $(element).addClass("animated fadeIn");
                    }
                    else
                    {
                        $(element).addClass("hidden");
                        $(element).removeClass("animated fadeIn");
                    }
                }
            };

            ko.bindingHandlers.slideInRight = {
                init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    if (!$(element).hasClass("hidden"))
                    {
                        $(element).addClass("hidden");
                    }

                    var duration = allBindings.get('slideInRightDuration') || 400; // 400ms is default duration unless otherwise specified

                    $(element).css("-moz-animation-duration",duration+"ms");
                    $(element).css("-webkit-animation-duration",duration+"ms");
                    $(element).css("animation-duration",duration+"ms");
                    $(element).css("-o-animation-duration",duration+"ms");
                },
                update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var value = valueAccessor();
                    var valueUnwrapped = ko.unwrap(value);

                    // Now manipulate the DOM element
                    if (valueUnwrapped == true)
                    {
                        $(element).removeClass("hidden");
                        $(element).addClass("animated slideInRight");
                    }
                    else
                    {
                        $(element).addClass("hidden");
                        $(element).removeClass("animated slideInRight");
                    }
                }
            };

            ko.bindingHandlers.injectLoaderHTML = {
                init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    $(element).append(Common.UI.getLoadingHTML);
                }
            };
        }
    }
}