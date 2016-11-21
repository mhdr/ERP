//<reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../nm.d.ts"/>
///<reference path="../common.d.ts"/>

window['format'];
var format: any;

namespace MainBodyProfile {

    export class UI {

        static load(complete:Function) {

            var parallel = new NM.Parallel(3);
            parallel.setOnComplete(function (result) {
                $("#divMainBodyProfile").velocity("fadeIn",{duration:250});
                complete();
            });

            $.ajax({
                url: "./api/User/GetUser",
                method: "POST",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        var d=data.user;
                        $("#spanUserName").html(d.userName);
                        $("#spanFirstName").html(d.firstName);
                        $("#spanLastName").html(d.lastName);
                    }

                    parallel.done("fn1");
                }
            });

            $.ajax({
                url: "./api/User/GetUserIP",
                method: "POST",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        $("#spanUserIP").html(data.ip);
                    }

                    parallel.done("fn2");
                }
            });

            $.ajax({
                url: "./api/User/GetLastLogin",
                method: "POST",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        $("#spanLastLoginIP").html(data.ip);
                        $("#spanLastLoginDate").html(data.loginDate);
                    }

                    parallel.done("fn3");
                }
            });
        }

        static bindAll() {
        }

        static unBindAll() {

        }
    }
}