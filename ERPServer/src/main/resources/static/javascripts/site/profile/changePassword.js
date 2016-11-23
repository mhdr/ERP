var MainBodyProfileChangePassword;
(function (MainBodyProfileChangePassword) {
    MainBodyProfileChangePassword.viewModel = {};
    var UI = (function () {
        function UI() {
        }
        UI.load = function (complete) {
            $("#divMainBodyChangePassword").velocity("fadeIn", { duration: 250 });
            complete();
        };
        UI.bindAll = function () {
            $("#buttonProfileCPSubmit").bind("click", MainBodyProfileChangePassword.UI.buttonSubmit_clicked);
        };
        UI.unBindAll = function () {
            $("#buttonProfileCPSubmit").unbind("click");
        };
        UI.buttonSubmit_clicked = function () {
            var clientSideError = 0;
            Site.Popover.remove("aProfileCPAlertPassword");
            Site.Popover.remove("aProfileCPAlertRepeatPassword");
            $("#inputProfileCPPassword").parent().removeClass("has-error");
            $("#inputProfileCPRepeatPassword").parent().removeClass("has-error");
            $("#alertProfileCPSuccess").velocity("fadeOut", { duration: 0 });
            var password = $("#inputProfileCPPassword").val();
            var repeatPassword = $("#inputProfileCPRepeatPassword").val();
            if (password.length === 0) {
                Site.Popover.create("divProfileCPAlerPassword1", "aProfileCPAlertPassword", "spanProfileCPAlertPassword");
                $("#inputProfileCPPassword").parent().addClass("has-error");
                clientSideError += 1;
            }
            else {
                if (password.length < 8) {
                    Site.Popover.create("divProfileCPAlerPassword2", "aProfileCPAlertPassword", "spanProfileCPAlertPassword");
                    $("#inputProfileCPPassword").parent().addClass("has-error");
                    clientSideError += 1;
                }
            }
            if (repeatPassword.length === 0) {
                Site.Popover.create("divProfileCPAlertRepeatPassword1", "aProfileCPAlertRepeatPassword", "spanProfileCPAlertRepeatPassword");
                $("#inputProfileCPRepeatPassword").parent().addClass("has-error");
                clientSideError += 1;
            }
            else {
                if (password !== repeatPassword) {
                    Site.Popover.create("divProfileCPAlertRepeatPassword2", "aProfileCPAlertRepeatPassword", "spanProfileCPAlertRepeatPassword");
                    $("#inputProfileCPRepeatPassword").parent().addClass("has-error");
                    clientSideError += 1;
                }
            }
            if (clientSideError == 0) {
                var parameters = {
                    password: password
                };
                Site.SubmitButton.afterClick("buttonProfileCPSubmit");
                $.ajax({
                    url: "./api/User/ChangePassword",
                    method: "POST",
                    data: parameters,
                    success: function (data, textStatus, jqXHR) {
                        if (data.error == 0) {
                            var msg = format("تغییر کلمه عبور انجام شد");
                            $("#alertProfileCPSuccess").html(msg);
                            $("#alertProfileCPSuccess").velocity("fadeIn");
                            $("#inputProfileCPPassword").val("");
                            $("#inputProfileCPRepeatPassword").val("");
                        }
                        else if (data.error === 4) {
                            var msg = format("ویرایش بدون تغییر انجام شد");
                            $("#alertProfileCPSuccess").html(msg);
                            $("#alertProfileCPSuccess").velocity("fadeIn");
                        }
                        Site.SubmitButton.afterCompelte("buttonProfileCPSubmit");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
            }
        };
        return UI;
    }());
    MainBodyProfileChangePassword.UI = UI;
})(MainBodyProfileChangePassword || (MainBodyProfileChangePassword = {}));
//# sourceMappingURL=changePassword.js.map