//<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="./nm.d.ts"/>
///<reference path="./common.d.ts"/>

namespace MainBodyProfileChangeData{
    export class UI{
        static load(complete:Function)
        {
            var parallel = new NM.Parallel(1);
            parallel.setOnComplete(function (result) {
                $("#divMainBodyProfileChangeData").velocity("fadeIn",{duration:250});
                complete();
            });

            $.ajax({
                url: "./api/User/GetUser",
                method: "POST",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        $("#inputProfileFirstName").val(data.firstName);
                        $("#inputProfileLastName").val(data.lastName);
                    }

                    parallel.done("fn1");
                }
            });
        }

        static bindAll()
        {
            $("#buttonProfileSubmit").bind("click", MainBodyProfileChangeData.UI.buttonSubmit_clicked);
        }

        static unBindAll()
        {
            $("#buttonProfileSubmit").unbind("click");
        }

        static buttonSubmit_clicked()
        {
            var clientSideError = 0;

            Site.Popover.remove("aProfileAlertFirstName");
            Site.Popover.remove("aProfileAlertLastName");

            $("#inputProfileFirstName").parent().removeClass("has-error");
            $("#inputProfileLastName").parent().removeClass("has-error");

            $("#alertProfileSuccess").velocity("fadeOut", {duration: 0});

            var firstName = $("#inputProfileFirstName").val();
            var lastName = $("#inputProfileLastName").val();


            if (firstName.length == 0) {
                Site.Popover.create("divProfileAlertFirstName1","aProfileAlertFirstName","spanProfileAlertFirstName");
                $("#inputProfileFirstName").parent().addClass("has-error");
                clientSideError += 1;
            }

            if (lastName.length == 0) {
                Site.Popover.create("divProfileAlertLastName1","aProfileAlertLastName","spanProfileAlertLastName");
                $("#inputProfileLastName").parent().addClass("has-error");
                clientSideError += 1;
            }

            if (clientSideError == 0) {

                var parameters = {
                    firstName: firstName,
                    lastName: lastName
                };


                Site.SubmitButton.afterClick("buttonProfileSubmit");

                // send ajax

                $.ajax({
                    url: "./api/User/EditUser",
                    method: "POST",
                    data: parameters,
                    success: function (data, textStatus, jqXHR) {
                        if (data.error == 0) {
                            var msg = format("ویرایش با موفقیت انجام شد");
                            $("#alertProfileSuccess").html(msg);
                            $("#alertProfileSuccess").velocity("fadeIn");
                        }
                        else if (data.error === 5) {
                            var msg = format("ویرایش بدون تغییر انجام شد");
                            $("#alertProfileSuccess").html(msg);
                            $("#alertProfileSuccess").velocity("fadeIn");
                        }

                        Site.SubmitButton.afterCompelte("buttonProfileSubmit");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                })
            }
        }
    }
}