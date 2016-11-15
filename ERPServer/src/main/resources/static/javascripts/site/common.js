window['format'];
var format;
var Site;
(function (Site) {
    var UI = (function () {
        function UI() {
        }
        UI.showLoaderForContent = function (element, top, left) {
            if (top === void 0) { top = 25; }
            if (left === void 0) { left = 50; }
            var html = "<div id='nm-loader' style='display: none;'><i></i><i></i><i></i><i></i><i></i><i></i></div>";
            var nmLoader = $("#nm-loader");
            if (nmLoader.length === 0) {
                $(element).append(html);
            }
            $("#nm-loader").css("top", top + "%");
            $("#nm-loader").css("left", left + "%");
            $("#nm-loader").velocity("fadeIn", { duration: 100, delay: 100 });
        };
        UI.hideLoaderForContent = function () {
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
        UI.showLoaderForMainBody = function () {
            var html = "<div id='nm-loader' style='display: none;'><i></i><i></i><i></i><i></i><i></i><i></i></div>";
            $("#mainBody div").addClass("loading-blur");
            var nmLoader = $("#nm-loader");
            if (nmLoader.length === 0) {
                $("#mainBody").append(html);
            }
            $("#nm-loader").velocity("fadeIn", { duration: 100, delay: 100 });
        };
        UI.hideLoaderForMainBody = function () {
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
        return UI;
    }());
    Site.UI = UI;
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