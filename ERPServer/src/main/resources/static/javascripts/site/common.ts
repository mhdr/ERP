///<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>

window['format'];
var format: any;

$(document).ready(function () {
    Site.UI.getVersion();
});

namespace Site {

    export var Statics = {
        version: localStorage.getItem("version"),
    };

    export class UI {

        static getVersion() {
            $.ajax({
                url: "./api/GetVersion",
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        localStorage.setItem("version", data.result);
                    }
                }
            });
        }

        static showLoaderForContent(element, top: number = 25, right: number = 50) {
            var html = "<div id='nm-loader' class='shaft-load2'><div class='shaft1'></div><div class='shaft2'></div><div class='shaft3'></div><div class='shaft4'></div><div class='shaft5'></div><div class='shaft6'></div><div class='shaft7'></div><div class='shaft8'></div><div class='shaft9'></div><div class='shaft10'></div></div>";
            var nmLoader = $("#nm-loader");

            if (nmLoader.length === 0) {
                $(element).append(html);
            }

            $("#nm-loader").css("top", top + "%");
            $("#nm-loader").css("right", right + "%");
            $("#nm-loader").velocity("fadeIn", {duration: 100, delay: 100});
        }

        static hideLoaderForContent() {
            var nmLoader = $("#nm-loader");
            if (nmLoader.length > 0) {
                $("#nm-loader").velocity({opacity: 0}, {
                    duration: 200,
                    complete: function (elements) {
                        $("#nm-loader").remove();
                    }
                });
            }
        }

        static showLoaderForMainBody(top: number = 15, right: number = 40) {
            var html = "<div id='nm-loader' class='shaft-load2'><div class='shaft1'></div><div class='shaft2'></div><div class='shaft3'></div><div class='shaft4'></div><div class='shaft5'></div><div class='shaft6'></div><div class='shaft7'></div><div class='shaft8'></div><div class='shaft9'></div><div class='shaft10'></div></div>";

            $("#mainBody div").addClass("loading-blur");

            var nmLoader = $("#nm-loader");

            if (nmLoader.length === 0) {
                $("#mainBody").append(html);
            }

            $("#nm-loader").css("top", top + "%");
            $("#nm-loader").css("right", right + "%");
            $("#nm-loader").velocity("fadeIn", {duration: 100, delay: 100});
        }

        static hideLoaderForMainBody() {
            var nmLoader = $("#nm-loader");
            if (nmLoader.length > 0) {
                $(".loading-blur").removeClass("loading-blur");
                $("#nm-loader").velocity({opacity: 0}, {
                    duration: 200,
                    complete: function (elements) {
                        $("#nm-loader").remove();
                    }
                });
            }
        }

    }

    export class Popover {
        /**
         *
         * @param msgId message to show
         * @param popoverId popover a tag
         * @param targetId where to show msg
         */
        static create(msgId: string, popoverId: string, targetId: string) {
            var template = "<a id='{0}' href='javascript:void(0)' data-html='true' style='opacity: 0;' data-placement='left' data-trigger='hover' tabindex='999'>" +
                "<i class='fa fa-info-circle nm-popover-icon' aria-hidden='true'></i></a>";

            var msg = $("#" + msgId).html();
            var content = format("<ul>{0}</ul>", msg);

            var html = format(template, popoverId);

            $("#" + targetId).prepend(html);
            $("#" + popoverId).velocity("callout.flash", {duration: 1000});
            $("#" + popoverId).popover({title: "خطا", animation: true, content: content});
        }

        /**
         *
         * @param popoverId popover a tag
         */
        static remove(popoverId: string) {
            $("#" + popoverId).remove();
        }
    }

    export class SubmitButton {
        static afterClick(id: string) {
            $("#" + id).prop("disabled", true);
            $("#" + id + " span i").css("opacity", 0.8);
        }

        static afterCompelte(id: string) {
            $("#" + id).prop("disabled", false);
            $("#" + id + " span i").css("opacity", 0);
        }
    }
}