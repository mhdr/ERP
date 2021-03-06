//<reference path="../../../../DefinitelyTyped/jquery/index.d.ts"/>
///<reference path="../../../../DefinitelyTyped/velocity-animate/index.d.ts"/>
///<reference path="../../../../DefinitelyTyped/handlebars/index.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/index.d.ts"/>
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
                    else if (data.error===-1)
                    {
                        window.location.href = data.redirect;
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
                    else if (data.error===-1)
                    {
                        window.location.href = data.redirect;
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
                    else if (data.error===-1)
                    {
                        window.location.href = data.redirect;
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