window['format'];
var format;
$(document).ready(function () {
    UI.investigatePermissions();
    UI.initializeSize();
    UI.bindAll();
    UI.renderLocationHash();
});
var UI = (function () {
    function UI() {
    }
    UI.bindAll = function () {
        UI.location_change();
        UI.window_resize();
    };
    UI.investigatePermissions = function () {
        sessionStorage.setItem("permissions", "");
        $.ajax({
            url: "./api/User/GetPermissions",
            method: "POST",
            success: function (data, textStatus, jqXHR) {
                if (data.error === 0) {
                    var permissions = data.result;
                    sessionStorage.setItem("permissions", JSON.stringify(permissions));
                    var items = $(".require-permission");
                    $(items).each(function (index, elem) {
                        var requiredPermission = $(elem).attr("data-nm-permission");
                        if ($.inArray(requiredPermission, permissions)) {
                            $(elem).removeClass("require-permission");
                        }
                    });
                }
            }
        });
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
    Template.renderModal = function () {
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
        if ($("#" + StaticData.mainBodyShowUsersCSS.styleId).length > 0) {
            $("#" + StaticData.mainBodyShowUsersCSS.styleId).remove();
        }
        if ($("#" + StaticData.mainBodyProfileCSS.styleId).length > 0) {
            $("#" + StaticData.mainBodyProfileCSS.styleId).remove();
        }
        if ($("#" + StaticData.mainBodyProfileCDCSS.styleId).length > 0) {
            $("#" + StaticData.mainBodyProfileCDCSS.styleId).remove();
        }
    };
    Template.emptyMainBodyJS = function (onComplete) {
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
    };
    return Template;
}());
var StaticData = (function () {
    function StaticData() {
    }
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
        url: "./stylesheets/site/mainBodyShowUsers.min.css" + "?" + Site.Statics.version
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
        url: "./javascripts/site/mainBodyShowUsers.min.js" + "?" + Site.Statics.version
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
        url: "./stylesheets/site/mainBodyProfile.min.css" + "?" + Site.Statics.version
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
        url: "./javascripts/site/mainBodyProfile.min.js" + "?" + Site.Statics.version
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
        url: "./stylesheets/site/mainBodyProfileChangeData.min.css" + "?" + Site.Statics.version
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
        url: "./javascripts/site/mainBodyProfileChangeData.min.js" + "?" + Site.Statics.version
    };
    StaticData.mainBodyProfileCD = {
        SideBar: StaticData.sideBarProfileCDHTML,
        HTML: StaticData.mainBodyProfileCDHTML,
        CSS: StaticData.mainBodyProfileCDCSS,
        JS: StaticData.mainBodyProfileCDJS
    };
    return StaticData;
}());
var BrowserLocation = (function () {
    function BrowserLocation() {
    }
    BrowserLocation.hasPermission = function (permissionRequired, callback) {
        var permissions = sessionStorage.getItem("permissions");
        if (permissions === null) {
            setTimeout(BrowserLocation.hasPermission(permissionRequired, callback), 1000);
            return;
        }
        var p = { permissionNumber: permissionRequired };
        if ($.inArray(p, permissions)) {
            var result = true;
            callback(result);
        }
        else {
            var result = false;
            callback(result);
        }
    };
    BrowserLocation.aShowUsers = function () {
        BrowserLocation.hasPermission(1, function (result) {
            if (result) {
                Template.renderMainBody(StaticData.mainBodyShowUsers, function () {
                    MainBodyShowUsers.UI.load(function () {
                        Site.UI.hideLoaderForMainBody();
                    });
                });
            }
        });
    };
    BrowserLocation.aShowForms = function () {
    };
    BrowserLocation.aProfile = function () {
        Template.renderMainBody(StaticData.mainBodyProfile, function () {
            MainBodyProfile.UI.load(function () {
                Site.UI.hideLoaderForMainBody();
            });
        });
    };
    BrowserLocation.aChangeProfile = function () {
        Template.renderMainBody(StaticData.mainBodyProfileCD, function () {
            MainBodyProfileChangeData.UI.load(function () {
                Site.UI.hideLoaderForMainBody();
            });
        });
    };
    BrowserLocation.aHome = function () {
        $("#sideBar").empty();
        $("#mainBody").empty();
    };
    BrowserLocation.aNewForms = function () {
    };
    return BrowserLocation;
}());
//# sourceMappingURL=index.js.map