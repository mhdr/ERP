var MainBodyProfileChangeData;
(function (MainBodyProfileChangeData) {
    var UI = (function () {
        function UI() {
        }
        UI.load = function (complete) {
            var parallel = new NM.Parallel(1);
            parallel.setOnComplete(function (result) {
                $("#divMainBodyProfileChangeData").velocity("fadeIn", { duration: 250 });
                complete();
            });
            $.ajax({
                url: "./api/User/GetUser",
                method: "POST",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        var d = data.user;
                        $("#inputProfileFirstName").val(d.firstName);
                        $("#inputProfileLastName").val(d.lastName);
                    }
                    parallel.done("fn1");
                }
            });
        };
        UI.bindAll = function () {
            $("#buttonProfileSubmit").bind("click", MainBodyProfileChangeData.UI.buttonSubmit_clicked);
        };
        UI.unBindAll = function () {
            $("#buttonProfileSubmit").unbind("click");
        };
        UI.buttonSubmit_clicked = function () {
            var clientSideError = 0;
            Site.Popover.remove("aProfileAlertFirstName");
            Site.Popover.remove("aProfileAlertLastName");
            $("#inputProfileFirstName").parent().removeClass("has-error");
            $("#inputProfileLastName").parent().removeClass("has-error");
            $("#alertProfileSuccess").velocity("fadeOut", { duration: 0 });
            $("#alertProfileFailed").velocity("fadeOut", { duration: 0 });
            var firstName = $("#inputProfileFirstName").val();
            var lastName = $("#inputProfileLastName").val();
            if (firstName.length == 0) {
                Site.Popover.create("divProfileAlertFirstName1", "aProfileAlertFirstName", "spanProfileAlertFirstName");
                $("#inputProfileFirstName").parent().addClass("has-error");
                clientSideError += 1;
            }
            if (lastName.length == 0) {
                Site.Popover.create("divProfileAlertLastName1", "aProfileAlertLastName", "spanProfileAlertLastName");
                $("#inputProfileLastName").parent().addClass("has-error");
                clientSideError += 1;
            }
            if (clientSideError == 0) {
                var parameters = {
                    firstName: firstName,
                    lastName: lastName
                };
                Site.SubmitButton.afterClick("buttonProfileSubmit");
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
                        else {
                            var msg = format("خطا در انجام ویرایش");
                            $("#alertProfileFailed").html(msg);
                            $("#alertProfileFailed").velocity("fadeIn");
                        }
                        Site.SubmitButton.afterCompelte("buttonProfileSubmit");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
            }
        };
        return UI;
    }());
    MainBodyProfileChangeData.UI = UI;
})(MainBodyProfileChangeData || (MainBodyProfileChangeData = {}));
//# sourceMappingURL=changeData.js.map