///<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="mainBodyShowUsers.d.ts"/>
///<reference path="mainBodyProfile.d.ts"/>
///<reference path="mainBodyProfileChangeData.d.ts"/>
///<reference path="nm.d.ts"/>
///<reference path="common.d.ts"/>

window['format'];
var format: any;

$(document).ready(function () {
    UI.investigatePermissions();
    UI.initializeSize();
    UI.bindAll();

    UI.renderLocationHash();
});

class UI {
    static bindAll() {
        UI.location_change();
        UI.window_resize();
    }

    /**
     * fetch permissions
     * then investigate them for current user
     */
    static investigatePermissions() {
        sessionStorage.setItem("permissions", "");

        $.ajax({
            url: "./api/User/GetPermissions",
            method: "POST",
            success: function (data, textStatus, jqXHR) {
                if (data.error === 0) {
                    var permissions = data.result;
                    sessionStorage.setItem("permissions", JSON.stringify(permissions));

                    var items = $(".require-permission");
                    $(items).each((index, elem)=> {
                        var requiredPermission = $(elem).attr("data-nm-permission");

                        if ($.inArray(requiredPermission, permissions)) {
                            $(elem).removeClass("require-permission");
                        }
                    });
                }
            }
        });
    }

    static setMainBodyHeight() {
        var screenHeight = $(window).height();
        var container1Height = $("#container1").height();

        var mainBoyHeight = screenHeight - container1Height;
        $("#mainBody").height(mainBoyHeight);
    }

    static initializeSize() {
        UI.setMainBodyHeight();
    }

    static window_resize() {
        $(window).resize(function () {
            UI.initializeSize();
        });
    }

    static location_change() {
        $(window).bind("hashchange", function () {
            UI.renderLocationHash();
        });
    }

    static renderLocationHash() {
        var hash = window.location.hash;

        switch (hash) {
            case "#":
                BrowserLocation.aHome();
                break;
            case "#Home":
                BrowserLocation.aHome();
                break;
            case "#Forms/Show":
                BrowserLocation.aShowForms();
                break;
            case "#Forms/New":
                BrowserLocation.aNewForms();
                break;
            case "#Users/Show":
                BrowserLocation.aShowUsers();
                break;
            case "#Profile":
                BrowserLocation.aProfile();
                break;
            case "#Profile/ChangeData":
                BrowserLocation.aChangeProfile();
                break;
        }
    }
}

class Template {

    static renderMainBody(data: MainBodyData, onComplete) {

        var parallel1=new NM.Parallel(2);

        parallel1.setOnComplete(function (result) {
            Site.UI.showLoaderForMainBody();

            var parallel2=new NM.Parallel(2);

            parallel2.setOnComplete(function (result) {
                onComplete();
            });

            Template.renderMainBodyCSS(data.CSS, function () {
                parallel2.done("fn1");
            });

            Template.renderMainBodyJS(data.JS, function () {
                parallel2.done("fn2");
            });
        });


        Template.renderSideBarHTML(data.SideBar, function () {
            parallel1.done("fn1");
        });

        Template.renderMainBodyHTML(data.HTML, function () {
            parallel1.done("fn2");
        })
    }

    static renderModal() {

    }

    static renderSideBarHTML(value: SideBarData, onComplete) {
        var activeNavBar = $("#ulNavbarItems").find("li.active");
        var activeNavBar2 = $("#ulNavbarItems2").find("li.active");

        if (activeNavBar.length > 0) {
            if ($(activeNavBar).attr("id") != value.liNavBar) {
                activeNavBar.removeClass("active");
                $("#" + value.liNavBar).addClass("active");
            }
        }

        if (activeNavBar2.length > 0) {
            if ($(activeNavBar2).attr("id") != value.liNavBar) {
                activeNavBar2.removeClass("active");
                $("#" + value.liNavBar).addClass("active");
            }
        }

        if (activeNavBar.length === 0 && activeNavBar2.length === 0) {
            $("#" + value.liNavBar).addClass("active");
        }

        // load sidebar for the first time
        if ($("#" + value.divSideBar).length == 0) {

            // remove other
            Template.emptySideBarHTML(function () {

                $.ajax({
                    url: value.url,
                    method: "GET",
                    success: function (data, textStatus, jqXHR) {
                        $("#sideBar").html(data);
                        var activeSideBar = $("#" + value.divSideBar).find("a.active");
                        if ($(activeSideBar).attr("id") != value.aSideBar) {
                            activeSideBar.removeClass("active");
                            $("#" + value.aSideBar).addClass("active");
                        }

                        $("#" + value.divSideBar).velocity("transition.slideRightBigIn", {duration: 750});

                        onComplete();
                    }
                });

            });
        }
        else {
            // already on the screen
            var activeSideBar = $("#" + value.divSideBar).find("a.active");
            if ($(activeSideBar).attr("id") != value.aSideBar) {
                activeSideBar.removeClass("active");
                $("#" + value.aSideBar).addClass("active");
            }

            onComplete();
        }
    }

    static renderMainBodyCSS(value: MainBodyCSSData, onComplete) {
        if ($("#" + value.styleId).length == 0) {

            // remove other css from dom
            Template.emptyMainBodyCSS();
            $.ajax({
                url: value.url,
                dataType: "text",
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    var style = format("<style id='{0}'>{1}</style>", value.styleId, data);
                    $("body").append(style);

                    onComplete();
                }
            });
        }
        else {
            // already on dom
            onComplete();
        }
    }

    static renderMainBodyJS(value: MainBodyJSData, onComplete) {

        if ($("#" + value.scriptId).length == 0) {

            // remove other js from dom
            Template.emptyMainBodyJS(function () {
                $.ajax({
                    url: value.url,
                    dataType: "text",
                    method: "GET",
                    success: function (data, textStatus, jqXHR) {
                        var js = format("<script id='{0}'>{1}</script>", value.scriptId, data);
                        $("body").append(js);

                        eval(format("{0}.UI.bindAll();", value.namespace));

                        onComplete();
                    }
                });
            });
        }
        else {
            // already on dom
            onComplete();
        }
    }

    static renderMainBodyHTML(value: MainBodyHTMLData, onComplete) {
        if ($("#" + value.divId).length == 0) {

            $.ajax({
                url: value.url,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#mainBody").html(data);

                    onComplete();
                }
            });
        }
        else {
            // already on dom
            onComplete();
        }
    }

    static emptySideBarHTML(onComplete) {
        $("#sideBar").empty();
        onComplete();
    }

    static emptyMainBodyCSS() {

        if ($("#" + StaticData.mainBodyShowUsersCSS.styleId).length > 0) {
            $("#" + StaticData.mainBodyShowUsersCSS.styleId).remove();
        }

        if ($("#" + StaticData.mainBodyProfileCSS.styleId).length > 0) {
            $("#" + StaticData.mainBodyProfileCSS.styleId).remove();
        }

        if ($("#" + StaticData.mainBodyProfileCDCSS.styleId).length > 0) {
            $("#" + StaticData.mainBodyProfileCDCSS.styleId).remove();
        }
    }

    static emptyMainBodyJS(onComplete) {
        if ($("#" + StaticData.mainBodyShowUsersJS.scriptId).length > 0) {
            MainBodyShowUsers.UI.unBindAll();
            $("#" + StaticData.mainBodyShowUsersJS.scriptId).remove();
        }

        if ($("#" + StaticData.mainBodyProfileJS.scriptId).length > 0) {
            MainBodyProfile.UI.unBindAll();
            $("#" + StaticData.mainBodyProfileJS.scriptId).remove();
        }

        if ($("#" + StaticData.mainBodyProfileCDJS.scriptId).length > 0) {
            MainBodyProfileChangeData.UI.unBindAll();
            $("#" + StaticData.mainBodyProfileCDJS.scriptId).remove();
        }
        onComplete();
    }
}

class StaticData {
    // Show Users
    static sideBarShowUsersHTML: SideBarData = {
        divSideBar: "divSidebarUsers",
        cache: "sideBarUsersHTML",
        url: "./hbs/sideBarUsers.hbs",
        aSideBar: "aShowUsers",
        liNavBar: "liUsers"
    };

    static mainBodyShowUsersCSS: MainBodyCSSData = {
        styleId: "styleMainBodyShowUsers",
        cache: "mainBodyShowUsersCSS",
        url: "./stylesheets/site/mainBodyShowUsers.min.css"
    };

    static mainBodyShowUsersHTML: MainBodyHTMLData = {
        divId: "divMainBodyShowUsers",
        cache: "mainBodyShowUsersHTML",
        url: "./hbs/mainBodyShowUsers.hbs"
    };

    static mainBodyShowUsersJS: MainBodyJSData = {
        namespace: "MainBodyShowUsers",
        scriptId: "scriptMainBodyShowUsers",
        cache: "mainBodyShowUsersJS",
        url: "./javascripts/site/mainBodyShowUsers.min.js"
    };

    static mainBodyShowUsers: MainBodyData = {
        SideBar: StaticData.sideBarShowUsersHTML,
        HTML: StaticData.mainBodyShowUsersHTML,
        CSS: StaticData.mainBodyShowUsersCSS,
        JS: StaticData.mainBodyShowUsersJS
    };

    //

    // Profile
    static sideBarProfileHTML: SideBarData = {
        divSideBar: "divSidebarProfile",
        cache: "sideBarProfileHTML",
        url: "./hbs/sideBarProfile.hbs",
        aSideBar: "aShowProfile",
        liNavBar: "liProfile"
    };

    static mainBodyProfileCSS: MainBodyCSSData = {
        styleId: "styleMainBodyProfile",
        cache: "mainBodyProfileCSS",
        url: "./stylesheets/site/mainBodyProfile.min.css"
    };

    static mainBodyProfileHTML: MainBodyHTMLData = {
        divId: "divMainBodyProfile",
        cache: "mainBodyProfileHTML",
        url: "./hbs/mainBodyProfile.hbs"
    };

    static mainBodyProfileJS: MainBodyJSData = {
        namespace: "MainBodyProfile",
        scriptId: "scriptMainBodyProfile",
        cache: "mainBodyProfileJS",
        url: "./javascripts/site/mainBodyProfile.min.js"
    };

    static mainBodyProfile: MainBodyData = {
        SideBar: StaticData.sideBarProfileHTML,
        HTML: StaticData.mainBodyProfileHTML,
        CSS: StaticData.mainBodyProfileCSS,
        JS: StaticData.mainBodyProfileJS
    };

    //

    // Profile/ChangeData
    static sideBarProfileCDHTML: SideBarData = {
        divSideBar: "divSidebarProfile",
        cache: "sideBarProfileHTML",
        url: "./hbs/sideBarProfile.hbs",
        aSideBar: "aChangeProfile",
        liNavBar: "liProfile"
    };

    static mainBodyProfileCDCSS: MainBodyCSSData = {
        styleId: "styleMainBodyProfileChangeData",
        cache: "mainBodyProfileChangeDataCSS",
        url: "./stylesheets/site/mainBodyProfileChangeData.min.css"
    };

    static mainBodyProfileCDHTML: MainBodyHTMLData = {
        divId: "divMainBodyProfileChangeData",
        cache: "mainBodyProfileChangeDataHTML",
        url: "./hbs/mainBodyProfileChangeData.hbs"
    };

    static mainBodyProfileCDJS: MainBodyJSData = {
        namespace: "MainBodyProfileChangeData",
        scriptId: "scriptMainBodyProfileChangeData",
        cache: "mainBodyProfileChangeDataJS",
        url: "./javascripts/site/mainBodyProfileChangeData.min.js"
    };

    static mainBodyProfileCD: MainBodyData = {
        SideBar: StaticData.sideBarProfileCDHTML,
        HTML: StaticData.mainBodyProfileCDHTML,
        CSS: StaticData.mainBodyProfileCDCSS,
        JS: StaticData.mainBodyProfileCDJS
    };

    //
}

interface SideBarData {
    divSideBar: string;
    cache: string;
    url: string;
    aSideBar: string;
    liNavBar: string;
}

interface MainBodyCSSData {
    styleId: string,
    cache: string,
    url: string
}

interface MainBodyData {
    SideBar: SideBarData,
    HTML: MainBodyHTMLData,
    CSS: MainBodyCSSData,
    JS: MainBodyJSData
}

interface MainBodyHTMLData {
    divId: string,
    cache: string,
    url: string
}

interface MainBodyJSData {
    namespace: string,
    scriptId: string,
    cache: string,
    url: string
}

class BrowserLocation {

    static hasPermission(permissionRequired: number, callback: Function) {
        var permissions = sessionStorage.getItem("permissions");

        if (permissions === null) {
            setTimeout(BrowserLocation.hasPermission(permissionRequired, callback), 1000);
            return;
        }

        var p = {permissionNumber: permissionRequired};

        if ($.inArray(p, permissions)) {
            // there is no require-permission class
            // so this user has the permission
            var result = true;
            callback(result);
        }
        else {
            var result = false;
            callback(result);
        }
    }

    static aShowUsers() {
        // required permission : 1
        BrowserLocation.hasPermission(1, (result)=> {
            if (result) {
                Template.renderMainBody(StaticData.mainBodyShowUsers, function () {
                    // load data
                    MainBodyShowUsers.UI.load(function () {
                        Site.UI.hideLoaderForMainBody();
                    });
                });
            }
        })
    }

    static aShowForms() {

    }

    static aProfile() {
        Template.renderMainBody(StaticData.mainBodyProfile, function () {
            // load data
            MainBodyProfile.UI.load(function () {
                Site.UI.hideLoaderForMainBody();
            });
        });
    }

    static aChangeProfile() {
        Template.renderMainBody(StaticData.mainBodyProfileCD, function () {
            // load data
            MainBodyProfileChangeData.UI.load(function () {
                Site.UI.hideLoaderForMainBody();
            });
        });
    }

    static aHome() {
        $("#sideBar").empty();
        $("#mainBody").empty();
    }

    static aNewForms() {

    }
}