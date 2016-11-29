///<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="nm.d.ts"/>
///<reference path="common.d.ts"/>

window['format'];
var format: any;

$(document).ready(function () {
    UI.initializeSize();
    UI.bindAll();

    UI.renderLocationHash();

    StaticData.loadIterator();
});

class UI {
    static bindAll() {
        UI.location_change();
        UI.window_resize();
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
        var data = StaticData.getStaticData();

        if (data!==null)
        {
            Template.renderMainBody(data, function () {
                // load data
                var cmd1 = data.JS.namespace + ".UI.load(function () {Site.UI.hideLoaderForMainBody();});";
                eval(cmd1);

            });
        }
    }
}

class Template {

    /**
     *
     * @param data
     * @param onComplete if this is null data must be loaded with document.ready in it's own js file
     */
    static renderMainBody(data: MainBodyData, onComplete) {
        var parallel1 = new NM.Parallel(2);

        parallel1.setOnComplete(function (result) {
            Site.UI.showLoaderForMainBody();

            var parallel2 = new NM.Parallel(2);

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

        for (var i = 0; i < staticDataIterator.length; i++) {
            var data: MainBodyData = staticDataIterator[i];

            if ($("#" + data.CSS.styleId).length > 0) {
                $("#" + data.CSS.styleId).remove();
            }
        }
    }

    static emptyMainBodyJS(onComplete) {

        for (var i = 0; i < staticDataIterator.length; i++) {
            var data: MainBodyData = staticDataIterator[i];

            if ($("#" + data.JS.scriptId).length > 0) {
                var cmd1 = format("{0}.UI.unBindAll();", data.JS.namespace);
                eval(cmd1);
                $("#" + data.JS.scriptId).remove();
            }
        }

        onComplete();
    }
}

var staticDataIterator = [];

class StaticData {

    static loadIterator() {
        staticDataIterator.push(StaticData.mainBodyAdminUsers);
        staticDataIterator.push(StaticData.mainBodyProfile);
        staticDataIterator.push(StaticData.mainBodyProfileCD);
        staticDataIterator.push(StaticData.mainBodyProfileCP);
        staticDataIterator.push(StaticData.mainBodyForms);
    }

    static getStaticData(): MainBodyData {
        var hash = window.location.hash;

        switch (hash) {
            case "#Admin/Users":
                return StaticData.mainBodyAdminUsers;
            case "#Admin/Forms":
                return StaticData.mainBodyForms;
            case "#Profile":
                return StaticData.mainBodyProfile;
            case "#Profile/ChangeData":
                return StaticData.mainBodyProfileCD;
            case "#Profile/ChangePassword":
                return StaticData.mainBodyProfileCP;
            default:
                return null;
        }
    }

    // #Admin/Users

    static sideBarAdminUsersHTML: SideBarData = {
        divSideBar: "divSidebarAdmin",
        url: "./hbs/sidebar/admin.hbs" + "?" + Site.Statics.version,
        aSideBar: "aUserAdmin",
        liNavBar: "liAdmin"
    };

    static mainBodyAdminUsersCSS: MainBodyCSSData = {
        styleId: "styleMainBodyShowUsers",
        url: "./stylesheets/site/admin/showUsers.min.css" + "?" + Site.Statics.version
    };

    static mainBodyAdminUsersHTML: MainBodyHTMLData = {
        divId: "divMainBodyShowUsers",
        url: "./hbs/mainBody/admin/users/showUsers.hbs" + "?" + Site.Statics.version
    };

    static mainBodyAdminUsersJS: MainBodyJSData = {
        namespace: "MainBodyShowUsers",
        scriptId: "scriptMainBodyShowUsers",
        url: "./javascripts/site/admin/showUsers.min.js" + "?" + Site.Statics.version
    };

    static mainBodyAdminUsers: MainBodyData = {
        SideBar: StaticData.sideBarAdminUsersHTML,
        HTML: StaticData.mainBodyAdminUsersHTML,
        CSS: StaticData.mainBodyAdminUsersCSS,
        JS: StaticData.mainBodyAdminUsersJS
    };

    //

    // Profile
    static sideBarProfileHTML: SideBarData = {
        divSideBar: "divSidebarProfile",
        url: "./hbs/sidebar/profile.hbs" + "?" + Site.Statics.version,
        aSideBar: "aShowProfile",
        liNavBar: "liProfile"
    };

    static mainBodyProfileCSS: MainBodyCSSData = {
        styleId: "styleMainBodyProfile",
        url: "./stylesheets/site/profile/profile.min.css" + "?" + Site.Statics.version
    };

    static mainBodyProfileHTML: MainBodyHTMLData = {
        divId: "divMainBodyProfile",
        url: "./hbs/mainBody/profile/profile.hbs" + "?" + Site.Statics.version
    };

    static mainBodyProfileJS: MainBodyJSData = {
        namespace: "MainBodyProfile",
        scriptId: "scriptMainBodyProfile",
        url: "./javascripts/site/profile/profile.min.js" + "?" + Site.Statics.version
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
        url: "./hbs/sidebar/profile.hbs" + "?" + Site.Statics.version,
        aSideBar: "aChangeProfile",
        liNavBar: "liProfile"
    };

    static mainBodyProfileCDCSS: MainBodyCSSData = {
        styleId: "styleMainBodyProfileChangeData",
        url: "./stylesheets/site/profile/changeData.min.css" + "?" + Site.Statics.version
    };

    static mainBodyProfileCDHTML: MainBodyHTMLData = {
        divId: "divMainBodyProfileChangeData",
        url: "./hbs/mainBody/profile/changeData.hbs" + "?" + Site.Statics.version
    };

    static mainBodyProfileCDJS: MainBodyJSData = {
        namespace: "MainBodyProfileChangeData",
        scriptId: "scriptMainBodyProfileChangeData",
        url: "./javascripts/site/profile/changeData.min.js" + "?" + Site.Statics.version
    };

    static mainBodyProfileCD: MainBodyData = {
        SideBar: StaticData.sideBarProfileCDHTML,
        HTML: StaticData.mainBodyProfileCDHTML,
        CSS: StaticData.mainBodyProfileCDCSS,
        JS: StaticData.mainBodyProfileCDJS
    };

    //

    // Profile/ChangePassword

    static sideBarProfileCPHTML: SideBarData = {
        divSideBar: "divSidebarProfile",
        url: "./hbs/sidebar/profile.hbs" + "?" + Site.Statics.version,
        aSideBar: "aChangePasswordInProfile",
        liNavBar: "liProfile"
    };

    static mainBodyProfileCPCSS: MainBodyCSSData = {
        styleId: "styleMainBodyProfileChangePassword",
        url: "./stylesheets/site/profile/changePassword.min.css" + "?" + Site.Statics.version
    };

    static mainBodyProfileCPHTML: MainBodyHTMLData = {
        divId: "divMainBodyProfileChangePassword",
        url: "./hbs/mainBody/profile/changePassword.hbs" + "?" + Site.Statics.version
    };

    static mainBodyProfileCPJS: MainBodyJSData = {
        namespace: "MainBodyProfileChangePassword",
        scriptId: "scriptMainBodyProfileChangePassword",
        url: "./javascripts/site/profile/changePassword.min.js" + "?" + Site.Statics.version
    };

    static mainBodyProfileCP: MainBodyData = {
        SideBar: StaticData.sideBarProfileCPHTML,
        HTML: StaticData.mainBodyProfileCPHTML,
        CSS: StaticData.mainBodyProfileCPCSS,
        JS: StaticData.mainBodyProfileCPJS
    };

    //

    // Forms

    static sideBarFormsHTML: SideBarData = {
        divSideBar: "divSidebarAdmin",
        url: "./hbs/sidebar/admin.hbs" + "?" + Site.Statics.version,
        aSideBar: "aFormAdmin",
        liNavBar: "liAdmin"
    };

    static mainBodyFormsCSS: MainBodyCSSData = {
        styleId: "styleMainBodyForms",
        url: "./stylesheets/site/admin/forms.min.css" + "?" + Site.Statics.version
    };

    static mainBodyFormsHTML: MainBodyHTMLData = {
        divId: "divMainBodyShowForms",
        url: "./hbs/mainBody/admin/forms/forms.hbs" + "?" + Site.Statics.version
    };

    static mainBodyFormsJS: MainBodyJSData = {
        namespace: "MainBodyForms",
        scriptId: "scriptMainBodyForms",
        url: "./javascripts/site/admin/forms.min.js" + "?" + Site.Statics.version
    };

    static mainBodyForms: MainBodyData = {
        SideBar: StaticData.sideBarFormsHTML,
        HTML: StaticData.mainBodyFormsHTML,
        CSS: StaticData.mainBodyFormsCSS,
        JS: StaticData.mainBodyFormsJS
    };

    //
}

interface SideBarData {
    divSideBar: string;
    url: string;
    aSideBar: string;
    liNavBar: string;
}

interface MainBodyCSSData {
    styleId: string,
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
    url: string
}

interface MainBodyJSData {
    namespace: string,
    scriptId: string,
    url: string
}