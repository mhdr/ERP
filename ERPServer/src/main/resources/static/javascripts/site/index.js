window['format'];
var format;
$(document).ready(function () {
    UI.initializeSize();
    UI.bindAll();
    UI.renderLocationHash();
    StaticData.loadIterator();
});
var UI = (function () {
    function UI() {
    }
    UI.bindAll = function () {
        UI.location_change();
        UI.window_resize();
    };
    UI.setMainBodyHeight = function () {
        var screenHeight = $(window).height();
        var container1Height = $("#container1").height();
        var mainBoyHeight = screenHeight - container1Height;
        $("#mainBody").height(mainBoyHeight);
    };
    UI.initializeSize = function () {
        UI.setMainBodyHeight();
    };
    UI.window_resize = function () {
        $(window).resize(function () {
            UI.initializeSize();
        });
    };
    UI.location_change = function () {
        $(window).bind("hashchange", function () {
            UI.renderLocationHash();
        });
    };
    UI.renderLocationHash = function () {
        var data = StaticData.getStaticData();
        Template.renderMainBody(data, function () {
            var cmd1 = data.JS.namespace + ".UI.load(function () {Site.UI.hideLoaderForMainBody();});";
            eval(cmd1);
        });
    };
    return UI;
}());
var Template = (function () {
    function Template() {
    }
    Template.renderMainBody = function (data, onComplete) {
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
        });
    };
    Template.renderSideBarHTML = function (value, onComplete) {
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
        if ($("#" + value.divSideBar).length == 0) {
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
                        $("#" + value.divSideBar).velocity("transition.slideRightBigIn", { duration: 750 });
                        onComplete();
                    }
                });
            });
        }
        else {
            var activeSideBar = $("#" + value.divSideBar).find("a.active");
            if ($(activeSideBar).attr("id") != value.aSideBar) {
                activeSideBar.removeClass("active");
                $("#" + value.aSideBar).addClass("active");
            }
            onComplete();
        }
    };
    Template.renderMainBodyCSS = function (value, onComplete) {
        if ($("#" + value.styleId).length == 0) {
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
            onComplete();
        }
    };
    Template.renderMainBodyJS = function (value, onComplete) {
        if ($("#" + value.scriptId).length == 0) {
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
            onComplete();
        }
    };
    Template.renderMainBodyHTML = function (value, onComplete) {
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
            onComplete();
        }
    };
    Template.emptySideBarHTML = function (onComplete) {
        $("#sideBar").empty();
        onComplete();
    };
    Template.emptyMainBodyCSS = function () {
        for (var i = 0; i < staticDataIterator.length; i++) {
            var data = staticDataIterator[i];
            if ($("#" + data.CSS.styleId).length > 0) {
                $("#" + data.CSS.styleId).remove();
            }
        }
    };
    Template.emptyMainBodyJS = function (onComplete) {
        for (var i = 0; i < staticDataIterator.length; i++) {
            var data = staticDataIterator[i];
            if ($("#" + data.JS.scriptId).length > 0) {
                var cmd1 = format("{0}.UI.unBindAll();", data.JS.namespace);
                eval(cmd1);
                $("#" + data.JS.scriptId).remove();
            }
        }
        onComplete();
    };
    return Template;
}());
var staticDataIterator = [];
var StaticData = (function () {
    function StaticData() {
    }
    StaticData.loadIterator = function () {
        staticDataIterator.push(StaticData.mainBodyShowUsers);
        staticDataIterator.push(StaticData.mainBodyProfile);
        staticDataIterator.push(StaticData.mainBodyProfileCD);
        staticDataIterator.push(StaticData.mainBodyProfileCP);
    };
    StaticData.getStaticData = function () {
        var hash = window.location.hash;
        switch (hash) {
            case "#Users/Show":
                return StaticData.mainBodyShowUsers;
            case "#Profile":
                return StaticData.mainBodyProfile;
            case "#Profile/ChangeData":
                return StaticData.mainBodyProfileCD;
            case "#Profile/ChangePassword":
                return StaticData.mainBodyProfileCP;
        }
    };
    StaticData.sideBarShowUsersHTML = {
        divSideBar: "divSidebarUsers",
        cache: "sideBarUsersHTML",
        url: "./hbs/sidebar/users.hbs" + "?" + Site.Statics.version,
        aSideBar: "aShowUsers",
        liNavBar: "liUsers"
    };
    StaticData.mainBodyShowUsersCSS = {
        styleId: "styleMainBodyShowUsers",
        cache: "mainBodyShowUsersCSS",
        url: "./stylesheets/site/users/showUsers.min.css" + "?" + Site.Statics.version
    };
    StaticData.mainBodyShowUsersHTML = {
        divId: "divMainBodyShowUsers",
        cache: "mainBodyShowUsersHTML",
        url: "./hbs/mainBody/users/showUsers.hbs" + "?" + Site.Statics.version
    };
    StaticData.mainBodyShowUsersJS = {
        namespace: "MainBodyShowUsers",
        scriptId: "scriptMainBodyShowUsers",
        cache: "mainBodyShowUsersJS",
        url: "./javascripts/site/users/showUsers.min.js" + "?" + Site.Statics.version
    };
    StaticData.mainBodyShowUsers = {
        SideBar: StaticData.sideBarShowUsersHTML,
        HTML: StaticData.mainBodyShowUsersHTML,
        CSS: StaticData.mainBodyShowUsersCSS,
        JS: StaticData.mainBodyShowUsersJS
    };
    StaticData.sideBarProfileHTML = {
        divSideBar: "divSidebarProfile",
        cache: "sideBarProfileHTML",
        url: "./hbs/sidebar/profile.hbs" + "?" + Site.Statics.version,
        aSideBar: "aShowProfile",
        liNavBar: "liProfile"
    };
    StaticData.mainBodyProfileCSS = {
        styleId: "styleMainBodyProfile",
        cache: "mainBodyProfileCSS",
        url: "./stylesheets/site/profile/profile.min.css" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileHTML = {
        divId: "divMainBodyProfile",
        cache: "mainBodyProfileHTML",
        url: "./hbs/mainBody/profile/profile.hbs" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileJS = {
        namespace: "MainBodyProfile",
        scriptId: "scriptMainBodyProfile",
        cache: "mainBodyProfileJS",
        url: "./javascripts/site/profile/profile.min.js" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfile = {
        SideBar: StaticData.sideBarProfileHTML,
        HTML: StaticData.mainBodyProfileHTML,
        CSS: StaticData.mainBodyProfileCSS,
        JS: StaticData.mainBodyProfileJS
    };
    StaticData.sideBarProfileCDHTML = {
        divSideBar: "divSidebarProfile",
        cache: "sideBarProfileHTML",
        url: "./hbs/sidebar/profile.hbs" + "?" + Site.Statics.version,
        aSideBar: "aChangeProfile",
        liNavBar: "liProfile"
    };
    StaticData.mainBodyProfileCDCSS = {
        styleId: "styleMainBodyProfileChangeData",
        cache: "mainBodyProfileChangeDataCSS",
        url: "./stylesheets/site/profile/changeData.min.css" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileCDHTML = {
        divId: "divMainBodyProfileChangeData",
        cache: "mainBodyProfileChangeDataHTML",
        url: "./hbs/mainBody/profile/changeData.hbs" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileCDJS = {
        namespace: "MainBodyProfileChangeData",
        scriptId: "scriptMainBodyProfileChangeData",
        cache: "mainBodyProfileChangeDataJS",
        url: "./javascripts/site/profile/changeData.min.js" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileCD = {
        SideBar: StaticData.sideBarProfileCDHTML,
        HTML: StaticData.mainBodyProfileCDHTML,
        CSS: StaticData.mainBodyProfileCDCSS,
        JS: StaticData.mainBodyProfileCDJS
    };
    StaticData.sideBarProfileCPHTML = {
        divSideBar: "divSidebarProfile",
        cache: "sideBarProfileHTML",
        url: "./hbs/sidebar/profile.hbs" + "?" + Site.Statics.version,
        aSideBar: "aChangePasswordInProfile",
        liNavBar: "liProfile"
    };
    StaticData.mainBodyProfileCPCSS = {
        styleId: "styleMainBodyProfileChangePassword",
        cache: "mainBodyProfileChangePasswordCSS",
        url: "./stylesheets/site/profile/changePassword.min.css" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileCPHTML = {
        divId: "divMainBodyProfileChangePassword",
        cache: "mainBodyProfileChangePasswordHTML",
        url: "./hbs/mainBody/profile/changePassword.hbs" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileCPJS = {
        namespace: "MainBodyProfileChangePassword",
        scriptId: "scriptMainBodyProfileChangePassword",
        cache: "mainBodyProfileChangePasswordJS",
        url: "./javascripts/site/profile/changePassword.min.js" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileCP = {
        SideBar: StaticData.sideBarProfileCPHTML,
        HTML: StaticData.mainBodyProfileCPHTML,
        CSS: StaticData.mainBodyProfileCPCSS,
        JS: StaticData.mainBodyProfileCPJS
    };
    return StaticData;
}());
//# sourceMappingURL=index.js.map