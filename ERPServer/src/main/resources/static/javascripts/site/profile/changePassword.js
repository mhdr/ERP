var MainBodyProfileChangePassword;
(function (MainBodyProfileChangePassword) {
    MainBodyProfileChangePassword.viewModel = {};
    var UI = (function () {
        function UI() {
        }
        UI.load = function (complete) {
            complete();
        };
        UI.bindAll = function () {
            ko.applyBindings(MainBodyProfileChangePassword.viewModel, document.getElementById("mainBody"));
        };
        UI.unBindAll = function () {
            ko.cleanNode(document.getElementById("mainBody"));
        };
        return UI;
    }());
    MainBodyProfileChangePassword.UI = UI;
})(MainBodyProfileChangePassword || (MainBodyProfileChangePassword = {}));
//# sourceMappingURL=changePassword.js.map