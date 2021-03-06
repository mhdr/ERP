window['format'];
var format;
var Site;
(function (Site) {
    var Statics = (function () {
        function Statics() {
        }
        Statics.getVersion = function () {
            $.ajax({
                url: "./api/GetVersion",
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        var oldValue = localStorage.getItem("version");
                        var newValue = data.result;
                        if (oldValue !== newValue) {
                            localStorage.setItem("version", newValue);
                            location.reload(true);
                        }
                    }
                }
            });
        };
        Statics.version = function () {
            var result = localStorage.getItem("version");
            return result;
        };
        return Statics;
    }());
    Site.Statics = Statics;
    var Loader = (function () {
        function Loader() {
        }
        Loader.showLoaderForContent = function (element, top, right) {
            if (top === void 0) { top = 25; }
            if (right === void 0) { right = 50; }
            var html = "<div id='nm-loader' class='shaft-load2'><div class='shaft1'></div><div class='shaft2'></div><div class='shaft3'></div><div class='shaft4'></div><div class='shaft5'></div><div class='shaft6'></div><div class='shaft7'></div><div class='shaft8'></div><div class='shaft9'></div><div class='shaft10'></div></div>";
            var nmLoader = $("#nm-loader");
            if (nmLoader.length === 0) {
                $(element).append(html);
            }
            $("#nm-loader").css("top", top + "%");
            $("#nm-loader").css("right", right + "%");
            $("#nm-loader").velocity("fadeIn", { duration: 100, delay: 100 });
        };
        Loader.hideLoaderForContent = function () {
            var nmLoader = $("#nm-loader");
            if (nmLoader.length > 0) {
                $("#nm-loader").velocity({ opacity: 0 }, {
                    duration: 200,
                    complete: function (elements) {
                        $("#nm-loader").remove();
                    }
                });
            }
        };
        Loader.showLoaderForMainBody = function (top, right) {
            if (top === void 0) { top = 15; }
            if (right === void 0) { right = 40; }
            var html = "<div id='nm-loader' class='shaft-load2'><div class='shaft1'></div><div class='shaft2'></div><div class='shaft3'></div><div class='shaft4'></div><div class='shaft5'></div><div class='shaft6'></div><div class='shaft7'></div><div class='shaft8'></div><div class='shaft9'></div><div class='shaft10'></div></div>";
            $("#mainBody div").addClass("loading-blur");
            var nmLoader = $("#nm-loader");
            if (nmLoader.length === 0) {
                $("#mainBody").append(html);
            }
            $("#nm-loader").css("top", top + "%");
            $("#nm-loader").css("right", right + "%");
            $("#nm-loader").velocity("fadeIn", { duration: 100, delay: 100 });
        };
        Loader.hideLoaderForMainBody = function () {
            var nmLoader = $("#nm-loader");
            if (nmLoader.length > 0) {
                $(".loading-blur").removeClass("loading-blur");
                $("#nm-loader").velocity({ opacity: 0 }, {
                    duration: 200,
                    complete: function (elements) {
                        $("#nm-loader").remove();
                    }
                });
            }
        };
        return Loader;
    }());
    Site.Loader = Loader;
    var Popover = (function () {
        function Popover() {
        }
        Popover.create = function (msgId, popoverId, targetId) {
            var template = "<a id='{0}' href='javascript:void(0)' data-html='true' style='opacity: 0;' data-placement='left' data-trigger='hover' tabindex='999'>" +
                "<i class='fa fa-info-circle nm-popover-icon' aria-hidden='true'></i></a>";
            var msg = $("#" + msgId).html();
            var content = format("<ul>{0}</ul>", msg);
            var html = format(template, popoverId);
            $("#" + targetId).prepend(html);
            $("#" + popoverId).velocity("callout.flash", { duration: 1000 });
            $("#" + popoverId).popover({ title: "خطا", animation: true, content: content });
        };
        Popover.remove = function (popoverId) {
            $("#" + popoverId).remove();
        };
        return Popover;
    }());
    Site.Popover = Popover;
    var SubmitButton = (function () {
        function SubmitButton() {
        }
        SubmitButton.afterClick = function (id) {
            $("#" + id).prop("disabled", true);
            $("#" + id + " span i").css("opacity", 0.8);
        };
        SubmitButton.afterCompelte = function (id) {
            $("#" + id).prop("disabled", false);
            $("#" + id + " span i").css("opacity", 0);
        };
        return SubmitButton;
    }());
    Site.SubmitButton = SubmitButton;
})(Site || (Site = {}));
//# sourceMappingURL=common.js.map