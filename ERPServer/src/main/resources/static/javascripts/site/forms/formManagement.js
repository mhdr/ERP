var MainBodyFormManagement;
(function (MainBodyFormManagement) {
    MainBodyFormManagement.viewModel = {
        temp: ko.observable(false)
    };
    var UI = (function () {
        function UI() {
        }
        UI.load = function (complete) {
            complete();
        };
        UI.bindAll = function () {
            ko.applyBindings(MainBodyFormManagement.viewModel, document.getElementById("divMainBodyShowFormManagement"));
        };
        UI.unBindAll = function () {
            ko.cleanNode(document.getElementById("divMainBodyShowFormManagement"));
        };
        return UI;
    }());
    MainBodyFormManagement.UI = UI;
})(MainBodyFormManagement || (MainBodyFormManagement = {}));
//# sourceMappingURL=formManagement.js.map