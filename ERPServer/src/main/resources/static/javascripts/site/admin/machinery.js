var MainBodyAdminMachinery;
(function (MainBodyAdminMachinery) {
    var UI = (function () {
        function UI() {
        }
        UI.load = function (complete) {
            var parameters = { parentId: "" };
            $.ajax({
                url: "./api/Machinery/GetMachinery",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        console.log(data);
                    }
                    $("#divMainBodyAdminMachinery").velocity("fadeIn", { duration: 250 });
                    complete();
                }
            });
        };
        UI.bindAll = function () {
        };
        UI.unBindAll = function () {
        };
        return UI;
    }());
    MainBodyAdminMachinery.UI = UI;
})(MainBodyAdminMachinery || (MainBodyAdminMachinery = {}));
//# sourceMappingURL=machinery.js.map