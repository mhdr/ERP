window['format'];
var format;
var MainBodyProfile;
(function (MainBodyProfile) {
    var UI = (function () {
        function UI() {
        }
        UI.load = function (complete) {
            var parallel = new NM.Parallel(3);
            parallel.setOnComplete(function (result) {
                $("#divMainBodyProfile").velocity("fadeIn", { duration: 250 });
                complete();
            });
            $.ajax({
                url: "./api/User/GetUser",
                method: "POST",
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        $("#spanUserName").html(data.userName);
                        $("#spanFirstName").html(data.firstName);
                        $("#spanLastName").html(data.lastName);
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
        };
        UI.bindAll = function () {
        };
        UI.unBindAll = function () {
        };
        return UI;
    }());
    MainBodyProfile.UI = UI;
})(MainBodyProfile || (MainBodyProfile = {}));
//# sourceMappingURL=mainBodyProfile.js.map