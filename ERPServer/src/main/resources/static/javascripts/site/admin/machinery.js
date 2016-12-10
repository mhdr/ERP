var MainBodyAdminMachinery;
(function (MainBodyAdminMachinery) {
    var UI = (function () {
        function UI() {
        }
        UI.load = function (complete) {
            var p = new NM.Parallel(5);
            p.setOnComplete(function () {
                MainBodyAdminMachinery.UI.getMachinery(function () {
                    $("#divMainBodyAdminMachinery").velocity("fadeIn", { duration: 250 });
                    UI.initialLoadIsDone = true;
                    complete();
                });
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/parentLocation.hbs" + "?" + Site.Statics.version,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateParentLocation").html(data);
                    p.done("fn1");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/locationUP.hbs" + "?" + Site.Statics.version,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateLocationUP").html(data);
                    p.done("fn2");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/unit.hbs" + "?" + Site.Statics.version,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateUnit").html(data);
                    p.done("fn3");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/machine.hbs" + "?" + Site.Statics.version,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateMachine").html(data);
                    p.done("fn4");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/folder.hbs" + "?" + Site.Statics.version,
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateFolder").html(data);
                    p.done("fn5");
                }
            });
        };
        UI.bindAll = function () {
            MainBodyAdminMachinery.UI.bindaCreateUnit();
        };
        UI.bindaCreateUnit = function () {
            $("#aCreateUnit").click(function (eventObject) {
                if ($("#divModalNewUnit").length === 0) {
                    $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                    $.ajax({
                        url: "./hbs/mainBody/admin/machinery/modalNewUnit.hbs" + "?" + Site.Statics.version,
                        method: "GET",
                        success: function (data, textStatus, jqXHR) {
                            $("#mainBody").append(data);
                            $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                            MainBodyAdminMachinery.UI.aCreateUnit_clicked();
                        }
                    });
                }
                else {
                    MainBodyAdminMachinery.UI.aCreateUnit_clicked();
                }
            });
        };
        UI.aCreateUnit_clicked = function () {
            $("#divModalNewUnit").modal("show");
        };
        UI.unBindAll = function () {
            UI.initialLoadIsDone = false;
            $("#aCreateUnit").unbind("click");
        };
        UI.bindListMachineryItems = function () {
            var a = $("#ulListMachinery").find("a");
            $(a).each(function (index, elem) {
                if ($(elem).attr("data-nm-up")) {
                    $(elem).click(function (eventObject) {
                        var id = this.getAttribute("data-nm-id");
                        UI.parentId = id;
                        UI.getMachinery();
                    });
                }
                else {
                    $(elem).dblclick(function (eventObject) {
                        var id = this.getAttribute("data-nm-id");
                        if (UI.countChildren[id] > 0) {
                            UI.parentId = id;
                            UI.getMachinery();
                        }
                    });
                }
            });
        };
        UI.bindParentLocationItems = function () {
            $("#divParentLocation").find("a").click(function (eventObject) {
                var id = this.getAttribute("data-nm-id");
                UI.parentId = id;
                UI.getMachinery();
            });
        };
        UI.getMachinery = function (onComplete) {
            if (onComplete === void 0) { onComplete = null; }
            if (UI.initialLoadIsDone) {
                Site.UI.showLoaderForContent("machineryBrowser", 15, 40);
            }
            var sourceLocationUP = $("#templateLocationUP").html();
            var templateLocationUP = Handlebars.compile(sourceLocationUP);
            var sourceUnit = $("#templateUnit").html();
            var templateUnit = Handlebars.compile(sourceUnit);
            var sourceMachine = $("#templateMachine").html();
            var templateMachine = Handlebars.compile(sourceMachine);
            var sourceFolder = $("#templateFolder").html();
            var templateFolder = Handlebars.compile(sourceFolder);
            var sourceParentLocation = $("#templateParentLocation").html();
            var templateParentLocation = Handlebars.compile(sourceParentLocation);
            var ulListMachinery = $("#ulListMachinery");
            var divParentLocation = $("#divParentLocation");
            $(ulListMachinery).empty();
            $(divParentLocation).empty();
            var parameters = { parentId: UI.parentId };
            $.ajax({
                url: "./api/Machinery/GetMachinery",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        var machinery = data.machinery;
                        var parents = data.parents;
                        UI.listParents = parents;
                        UI.countChildren = data.countChildren;
                        $("#machineryBrowser").velocity("fadeOut", 10);
                        var context = {
                            id: "",
                            value: "شاخه اصلی"
                        };
                        var html = templateParentLocation(context);
                        $(divParentLocation).append(html);
                        for (var i = 0; i < parents.length; i++) {
                            var context_1 = {
                                id: parents[i].id,
                                value: parents[i].value
                            };
                            var html_1 = templateParentLocation(context_1);
                            $(divParentLocation).append(html_1);
                        }
                        if (UI.parentId !== "") {
                            var idUP = "";
                            if (UI.listParents.length == 1) {
                                idUP = "";
                            }
                            else {
                                idUP = UI.listParents[UI.listParents.length - 2].id;
                            }
                            var context_2 = {
                                id: idUP
                            };
                            var html_2 = templateLocationUP(context_2);
                            $(ulListMachinery).append(html_2);
                        }
                        for (var i = 0; i < machinery.length; i++) {
                            var id = machinery[i].id;
                            if (machinery[i].machineryType === "Unit") {
                                var unit = machinery[i].unit;
                                var countChildren = "";
                                if (UI.countChildren[id] > 0) {
                                    countChildren = UI.countChildren[id];
                                }
                                var context_3 = {
                                    id: id,
                                    unitNameFa: unit.unitNameFa,
                                    unitNameEn: unit.unitNameEn,
                                    countChildren: countChildren
                                };
                                var html_3 = templateUnit(context_3);
                                $(ulListMachinery).append(html_3);
                            }
                            else if (machinery[i].machineryType === "Machine") {
                                var machine = machinery[i].machine;
                                var countChildren = "";
                                if (UI.countChildren[id] > 0) {
                                    countChildren = UI.countChildren[id];
                                }
                                var context_4 = {
                                    id: id,
                                    machineNameFa: machine.machineNameFa,
                                    machineNameEn: machine.machineNameEn,
                                    pmCode: machine.pmCode,
                                    countChildren: countChildren
                                };
                                var html_4 = templateMachine(context_4);
                                $(ulListMachinery).append(html_4);
                            }
                            else if (machinery[i].machineryType === "Folder") {
                                var folder = machinery[i].folder;
                                var countChildren = "";
                                if (UI.countChildren[id] > 0) {
                                    countChildren = UI.countChildren[id];
                                }
                                var context_5 = {
                                    id: id,
                                    folderNameFa: folder.folderNameFa,
                                    folderNameEn: folder.folderNameEn,
                                    countChildren: countChildren
                                };
                                var html_5 = templateFolder(context_5);
                                $(ulListMachinery).append(html_5);
                            }
                        }
                        UI.bindListMachineryItems();
                        UI.bindParentLocationItems();
                    }
                    else if (data.error === -1) {
                        window.location.href = data.redirect;
                    }
                    if (UI.initialLoadIsDone) {
                        Site.UI.hideLoaderForContent();
                    }
                    $("#machineryBrowser").velocity("fadeIn", 250);
                    if (onComplete !== null) {
                        onComplete();
                    }
                }
            });
        };
        UI.initialLoadIsDone = false;
        UI.parentId = "";
        UI.listParents = [];
        UI.countChildren = [];
        return UI;
    }());
    MainBodyAdminMachinery.UI = UI;
})(MainBodyAdminMachinery || (MainBodyAdminMachinery = {}));
//# sourceMappingURL=machinery.js.map