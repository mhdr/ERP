window['format'];
var format;
var ViewModel;
(function (ViewModel) {
    ViewModel.sidebar = {
        show_sidebar: ko.observable(false),
        users_show: ko.observable(false)
    };
    ViewModel.navigationbar = {
        users: ko.observable(false),
        forms: ko.observable(false),
        profile: ko.observable(false)
    };
    ViewModel.users_show = {
        show_mainbody: ko.observable(false)
    };
})(ViewModel || (ViewModel = {}));
var Common;
(function (Common) {
    var Parallel = (function () {
        function Parallel(numberOfTasks) {
            this.numberOfTasks = numberOfTasks;
            this.taskCompleted = 0;
            this.callbacks = [];
        }
        Parallel.prototype.setOnComplete = function (fn) {
            this.complete = fn;
        };
        Parallel.prototype.done = function (name, value) {
            if (value === void 0) { value = null; }
            var newValue = { name: name, value: value };
            this.callbacks.push(newValue);
            this.taskCompleted += 1;
            if (this.taskCompleted === this.numberOfTasks) {
                this.complete(this.callbacks);
            }
        };
        return Parallel;
    }());
    Common.Parallel = Parallel;
    var Router = (function () {
        function Router() {
        }
        Router.initialize = function () {
            Common.Router.renderLocationHash();
            Common.Router.bind();
            ko.applyBindings(ViewModel.navigationbar, document.getElementById("topMenu"));
        };
        Router.bind = function () {
            $(window).bind("hashchange", function () {
                Common.Router.renderLocationHash();
            });
        };
        Router.getStaticData = function (target) {
            var result;
            switch (target) {
                case "users_show":
                    result = {
                        sidebar: "/hbs/sidebar/users.hbs",
                        html: "/hbs/mainBody/users/show.hbs",
                        css: "/stylesheets/site/users/show.min.css",
                        js: "/javascripts/site/users/show.min.js"
                    };
                    break;
                default:
                    result = {
                        sidebar: "",
                        html: "",
                        css: "",
                        js: ""
                    };
            }
            return result;
        };
        Router.swapSidebarItem = function (target) {
            var viewModel = ViewModel.sidebar;
            for (var key in viewModel) {
                var fn1 = viewModel[key];
                fn1(false);
            }
            var fn2 = viewModel[target];
            fn2(true);
        };
        Router.swapNavigationbar = function (target) {
            if (target === void 0) { target = ""; }
            var viewModel = ViewModel.navigationbar;
            for (var key in viewModel) {
                var fn1 = viewModel[key];
                fn1(false);
            }
            if (target !== "") {
                var fn2 = viewModel[target];
                fn2(true);
            }
        };
        Router.renderMainBody = function (target) {
            if (target === void 0) { target = ""; }
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
                    var cssUrl = Common.Router.getStaticData(target).css;
                    var jsUrl = Common.Router.getStaticData(target).js;
                    $.ajax({
                        url: cssUrl,
                        method: "GET",
                        dataType: 'text',
                        success: function (data, textStatus, jqXHR) {
                            var css = format("<style>{0}</style>", data);
                            $("#mainBody div:first").append(css);
                        }
                    });
                    $.ajax({
                        url: jsUrl,
                        method: "GET",
                        dataType: 'text',
                        success: function (data, textStatus, jqXHR) {
                            var css = format("<script>{0}</script>", data);
                            $("#mainBody div:first").append(css);
                        }
                    });
                }
            });
        };
        Router.renderSidebar = function (target) {
            if (target === void 0) { target = ""; }
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
            });
        };
        Router.renderLocationHash = function () {
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
        };
        return Router;
    }());
    Common.Router = Router;
    var UI = (function () {
        function UI() {
        }
        UI.getLoadingHTML = function () {
            var html = "<div class='shaft-load2'>" +
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
        };
        UI.registerKOHandlers = function () {
            ko.bindingHandlers.fadeIn = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    if (!$(element).hasClass("hidden")) {
                        $(element).addClass("hidden");
                    }
                    var duration = allBindings.get('fadeInDuration') || 400;
                    $(element).css("-moz-animation-duration", duration + "ms");
                    $(element).css("-webkit-animation-duration", duration + "ms");
                    $(element).css("animation-duration", duration + "ms");
                    $(element).css("-o-animation-duration", duration + "ms");
                },
                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var value = valueAccessor();
                    var valueUnwrapped = ko.unwrap(value);
                    if (valueUnwrapped == true) {
                        $(element).removeClass("hidden");
                        $(element).addClass("animated fadeIn");
                    }
                    else {
                        $(element).addClass("hidden");
                        $(element).removeClass("animated fadeIn");
                    }
                }
            };
            ko.bindingHandlers.slideInRight = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    if (!$(element).hasClass("hidden")) {
                        $(element).addClass("hidden");
                    }
                    var duration = allBindings.get('slideInRightDuration') || 400;
                    $(element).css("-moz-animation-duration", duration + "ms");
                    $(element).css("-webkit-animation-duration", duration + "ms");
                    $(element).css("animation-duration", duration + "ms");
                    $(element).css("-o-animation-duration", duration + "ms");
                },
                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var value = valueAccessor();
                    var valueUnwrapped = ko.unwrap(value);
                    if (valueUnwrapped == true) {
                        $(element).removeClass("hidden");
                        $(element).addClass("animated slideInRight");
                    }
                    else {
                        $(element).addClass("hidden");
                        $(element).removeClass("animated slideInRight");
                    }
                }
            };
            ko.bindingHandlers.injectLoaderHTML = {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    $(element).append(Common.UI.getLoadingHTML);
                }
            };
        };
        return UI;
    }());
    Common.UI = UI;
})(Common || (Common = {}));
//# sourceMappingURL=common.js.map