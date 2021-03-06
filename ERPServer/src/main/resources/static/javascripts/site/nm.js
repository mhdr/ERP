var NM;
(function (NM) {
    var Parallel = (function () {
        function Parallel(numberOfTasks) {
            this.numberOfTasks = numberOfTasks;
            this.taskCompleted = 0;
            this.callbacks = [];
        }
        Parallel.prototype.setOnComplete = function (fn) {
            this.complete = fn;
        };
        Parallel.prototype.done = function (name, value) {
            if (value === void 0) { value = null; }
            var newValue = { name: name, value: value };
            this.callbacks.push(newValue);
            this.taskCompleted += 1;
            if (this.taskCompleted === this.numberOfTasks) {
                this.complete(this.callbacks);
            }
        };
        return Parallel;
    }());
    NM.Parallel = Parallel;
    var UI = (function () {
        function UI() {
        }
        UI.centerVertically = function () {
            var elements = $("[data-nm-fn='centerVertically']");
            $(elements).each(function (index, elem) {
                var parameter1 = $(elem).attr("data-nm-outerId");
                if (parameter1 !== undefined && parameter1.length > 0) {
                    var outerElementHeight = $("#" + parameter1).height();
                }
                else {
                    var outerElementHeight = $(window).height();
                }
                var innerElementHeight = $(elem).height();
                var diff = outerElementHeight - innerElementHeight;
                var marginTop = diff / 2;
                $(elem).css("margin-top", marginTop + "px");
            });
        };
        UI.centerHorizontally = function () {
            var elements = $("[data-nm-fn='centerHorizontally']");
            $(elements).each(function (index, elem) {
                var parameter1 = $(elem).attr("data-nm-outerId");
                if (parameter1 !== undefined && parameter1.length > 0) {
                    var outerElementWidth = $("#" + parameter1).width();
                }
                else {
                    var outerElementWidth = $(window).width();
                }
                var innerElementWidth = $(elem).width();
                var diff = outerElementWidth - innerElementWidth;
                var marginRight = diff / 2;
                $(elem).css("margin-right", marginRight + "px");
            });
        };
        UI.setHeightToParent = function () {
            var elements = $("[data-nm-fn='setHeightToParent']");
            $(elements).each(function (index, elem) {
                var parameter1 = $(elem).attr("data-nm-outerId");
                if (parameter1 !== undefined && parameter1.length > 0) {
                    var outerElementHeight = $("#" + parameter1).height();
                }
                else {
                    var outerElementHeight = $(elem).parent().height();
                }
                $(elem).height(outerElementHeight);
            });
        };
        return UI;
    }());
    NM.UI = UI;
})(NM || (NM = {}));
//# sourceMappingURL=nm.js.map