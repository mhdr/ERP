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
                url: "./hbs/mainBody/admin/machinery/parentLocation.hbs" + "?" + Site.Statics.version(),
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateParentLocation").html(data);
                    p.done("fn1");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/locationUP.hbs" + "?" + Site.Statics.version(),
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateLocationUP").html(data);
                    p.done("fn2");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/unit.hbs" + "?" + Site.Statics.version(),
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateUnit").html(data);
                    p.done("fn3");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/machine.hbs" + "?" + Site.Statics.version(),
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateMachine").html(data);
                    p.done("fn4");
                }
            });
            $.ajax({
                url: "./hbs/mainBody/admin/machinery/folder.hbs" + "?" + Site.Statics.version(),
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    $("#templateFolder").html(data);
                    p.done("fn5");
                }
            });
        };
        UI.bindAll = function () {
            MainBodyAdminMachinery.UI.bindaCreateUnit();
            MainBodyAdminMachinery.UI.bindaDeleteMachinery();
            MainBodyAdminMachinery.UI.bindaCreateMachine();
            MainBodyAdminMachinery.UI.bindaCreateFolder();
            MainBodyAdminMachinery.UI.bindaEditMachinery();
        };
        UI.bindaCreateMachine = function () {
            $("#aCreateMachine").click(function (eventObject) {
                if ($("#divModalNewMachine").length === 0) {
                    $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                    $.ajax({
                        url: "./hbs/mainBody/admin/machinery/modalNewMachine.hbs" + "?" + Site.Statics.version(),
                        method: "GET",
                        success: function (data, textStatus, jqXHR) {
                            $("#mainBody").append(data);
                            $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                            MainBodyAdminMachinery.UI.aCreateMachine_clicked();
                        }
                    });
                }
                else {
                    MainBodyAdminMachinery.UI.aCreateMachine_clicked();
                }
            });
        };
        UI.bindaDeleteMachinery = function () {
            $("#aDelete").click(function (eventObject) {
                if (UI.countChildren[UI.selectedMachineryId] > 0) {
                    if ($("#divModalRejectDeleteMachinery").length === 0) {
                        $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                        $.ajax({
                            url: "./hbs/mainBody/admin/machinery/modalRejectDelete.hbs" + "?" + Site.Statics.version(),
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#mainBody").append(data);
                                $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                                MainBodyAdminMachinery.UI.aDeleteMachinery2_clicked();
                            }
                        });
                    }
                    else {
                        MainBodyAdminMachinery.UI.aDeleteMachinery2_clicked();
                    }
                }
                else {
                    if ($("#divModalConfirmDeleteMachinery").length === 0) {
                        $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                        $.ajax({
                            url: "./hbs/mainBody/admin/machinery/modalConfirmDelete.hbs" + "?" + Site.Statics.version(),
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#mainBody").append(data);
                                $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                                MainBodyAdminMachinery.UI.aDeleteMachinery_clicked();
                            }
                        });
                    }
                    else {
                        MainBodyAdminMachinery.UI.aDeleteMachinery_clicked();
                    }
                }
            });
        };
        UI.aDeleteMachinery_clicked = function () {
            ModalConfirmDelete.bindAll();
            $("#divModalConfirmDeleteMachinery").modal("show");
        };
        UI.aDeleteMachinery2_clicked = function () {
            $("#divModalRejectDeleteMachinery").modal("show");
        };
        UI.aEditUnit_clicked = function () {
            ModalEditUnit.load();
            $("#divModalEditUnit").modal("show");
        };
        UI.aEditMachine_clicked = function () {
            $("#divModalEditMachine").modal("show");
        };
        UI.aEditFolder_clicked = function () {
            $("#divModalEditFolder").modal("show");
        };
        UI.bindaEditMachinery = function () {
            $("#aEdit").click(function (eventObject) {
                var selected = $(".machinery-selected");
                var machineryType = $(selected).attr("data-nm-type");
                if (machineryType === "Unit") {
                    if ($("#divModalEditUnit").length === 0) {
                        $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                        $.ajax({
                            url: "./hbs/mainBody/admin/machinery/modalEditUnit.hbs" + "?" + Site.Statics.version(),
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#mainBody").append(data);
                                $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                                MainBodyAdminMachinery.UI.aEditUnit_clicked();
                            }
                        });
                    }
                    else {
                        MainBodyAdminMachinery.UI.aEditUnit_clicked();
                    }
                }
                else if (machineryType === "Machine") {
                    if ($("#divModalEditMachine").length === 0) {
                        $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                        $.ajax({
                            url: "./hbs/mainBody/admin/machinery/modalEditMachine.hbs" + "?" + Site.Statics.version(),
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#mainBody").append(data);
                                $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                                MainBodyAdminMachinery.UI.aEditMachine_clicked();
                            }
                        });
                    }
                    else {
                        MainBodyAdminMachinery.UI.aEditMachine_clicked();
                    }
                }
                else if (machineryType === "Folder") {
                    if ($("#divModalEditFolder").length === 0) {
                        $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                        $.ajax({
                            url: "./hbs/mainBody/admin/machinery/modalEditFolder.hbs" + "?" + Site.Statics.version(),
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#mainBody").append(data);
                                $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                                MainBodyAdminMachinery.UI.aEditFolder_clicked();
                            }
                        });
                    }
                    else {
                        MainBodyAdminMachinery.UI.aEditFolder_clicked();
                    }
                }
            });
        };
        UI.bindaCreateFolder = function () {
            $("#aCreateFolder").click(function (eventObject) {
                if ($("#divModalNewFolder").length === 0) {
                    $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                    $.ajax({
                        url: "./hbs/mainBody/admin/machinery/modalNewFolder.hbs" + "?" + Site.Statics.version(),
                        method: "GET",
                        success: function (data, textStatus, jqXHR) {
                            $("#mainBody").append(data);
                            $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 0 }, { duration: 50 });
                            MainBodyAdminMachinery.UI.aCreateFolder_clicked();
                        }
                    });
                }
                else {
                    MainBodyAdminMachinery.UI.aCreateFolder_clicked();
                }
            });
        };
        UI.bindaCreateUnit = function () {
            $("#aCreateUnit").click(function (eventObject) {
                if ($("#divModalNewUnit").length === 0) {
                    $("#aLoadingNavbarMainBodyMachinery").velocity({ opacity: 1 }, { duration: 50 });
                    $.ajax({
                        url: "./hbs/mainBody/admin/machinery/modalNewUnit.hbs" + "?" + Site.Statics.version(),
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
        UI.activateNavbarItems = function () {
            if ($("#aEdit").hasClass("nm-disable-a")) {
                $("#aEdit").removeClass("nm-disable-a");
                $("#aEdit").parent().removeClass("nm-disable-li");
            }
            if ($("#aDelete").hasClass("nm-disable-a")) {
                $("#aDelete").removeClass("nm-disable-a");
                $("#aDelete").parent().removeClass("nm-disable-li");
            }
        };
        UI.deactivateNavbarItems = function () {
            if (!$("#aEdit").hasClass("nm-disable-a")) {
                $("#aEdit").addClass("nm-disable-a");
                $("#aEdit").parent().addClass("nm-disable-li");
            }
            if (!$("#aDelete").hasClass("nm-disable-a")) {
                $("#aDelete").addClass("nm-disable-a");
                $("#aDelete").parent().addClass("nm-disable-li");
            }
        };
        UI.aCreateUnit_clicked = function () {
            ModalNewUnit.load();
            $("#divModalNewUnit").modal("show");
        };
        UI.aCreateFolder_clicked = function () {
            ModalNewFolder.load();
            $("#divModalNewFolder").modal("show");
        };
        UI.aCreateMachine_clicked = function () {
            ModalNewMachine.load();
            $("#divModalNewMachine").modal("show");
        };
        UI.machinerySelected = function (element) {
            var a = $("#ulListMachinery").find("a");
            $(a).each(function (index, elem) {
                if ($(elem).hasClass("machinery-selected")) {
                    $(elem).removeClass("machinery-selected");
                }
            });
            $(element).addClass("machinery-selected");
            UI.activateNavbarItems();
        };
        UI.unBindAll = function () {
            UI.initialLoadIsDone = false;
            $("#aCreateUnit").unbind("click");
            $("#aDelete").unbind("click");
            $("#aCreateMachine").unbind("click");
            $("#aCreateFolder").unbind("click");
            $("#aEdit").unbind("click");
        };
        UI.bindListMachineryItems = function () {
            var a = $("#ulListMachinery").find("a");
            $(a).each(function (index, elem) {
                $(elem).click(function (eventObject) {
                    var id = this.getAttribute("data-nm-id");
                    UI.machinerySelected(this);
                    UI.selectedMachineryId = id;
                });
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
                        UI.parentId = id;
                        UI.getMachinery();
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
                Site.Loader.showLoaderForContent("machineryBrowser", 15, 40);
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
                                    type: "Unit",
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
                                    type: "Machine",
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
                                    type: "Folder",
                                    folderNameFa: folder.folderNameFa,
                                    folderNameEn: folder.folderNameEn,
                                    countChildren: countChildren
                                };
                                var html_5 = templateFolder(context_5);
                                $(ulListMachinery).append(html_5);
                            }
                        }
                        UI.countUpdateAvailable = 0;
                        UI.deactivateNavbarItems();
                        UI.bindListMachineryItems();
                        UI.bindParentLocationItems();
                        UI.selectedMachineryId = "";
                    }
                    else if (data.error === -1) {
                        window.location.href = data.redirect;
                    }
                    if (UI.initialLoadIsDone) {
                        Site.Loader.hideLoaderForContent();
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
        UI.countUpdateAvailable = 0;
        UI.selectedMachineryId = "";
        return UI;
    }());
    MainBodyAdminMachinery.UI = UI;
    var ModalConfirmDelete = (function () {
        function ModalConfirmDelete() {
        }
        ModalConfirmDelete.bindAll = function () {
            $("#divModalConfirmDeleteMachinery").on("hidden.bs.modal", ModalConfirmDelete.modal_closed);
            ModalConfirmDelete.bindButtonConfirmDeleteMachinery();
        };
        ModalConfirmDelete.bindButtonConfirmDeleteMachinery = function () {
            $("#buttonConfirmDeleteMachinery").click(function (eventObject) {
                if (UI.selectedMachineryId.length > 0) {
                    var parameters = {
                        machineryId: UI.selectedMachineryId
                    };
                    $.ajax({
                        url: "./api/Machinery/DeleteMachinery",
                        method: "POST",
                        data: parameters,
                        success: function (data, textStatus, jqXHR) {
                            if (data.error === 0) {
                                UI.countUpdateAvailable += 1;
                                $("#divModalConfirmDeleteMachinery").modal("hide");
                            }
                        }
                    });
                }
            });
        };
        ModalConfirmDelete.modal_closed = function (e) {
            ModalConfirmDelete.unBindAll();
            ModalConfirmDelete.clearAll();
            if (UI.countUpdateAvailable > 0) {
                UI.getMachinery();
            }
        };
        ModalConfirmDelete.clearAll = function () {
        };
        ModalConfirmDelete.unBindAll = function () {
            $("#buttonConfirmDeleteMachinery").unbind("click");
            $("#divModalConfirmDeleteMachinery").unbind("hidden.bs.modal");
        };
        return ModalConfirmDelete;
    }());
    MainBodyAdminMachinery.ModalConfirmDelete = ModalConfirmDelete;
    var ModalNewFolder = (function () {
        function ModalNewFolder() {
        }
        ModalNewFolder.buttonSubmit_clicked = function () {
            $("#alertSuccess2").velocity("fadeOut", { duration: 0 });
            Site.Popover.remove("aMachineryAlertFolderNameFa");
            $("#inputFolderNameFa").parent().removeClass("has-error");
            var folderNameFa = ModalNewFolder.viewModel.folderNameFa();
            var folderNameEn = ModalNewFolder.viewModel.folderNameEn();
            var clientSideError = 0;
            if (folderNameFa.length === 0) {
                Site.Popover.create("divAlertFolderNameFa1", "aMachineryAlertFolderNameFa", "spanAlertFolderNameFa");
                $("#inputFolderNameFa").parent().addClass("has-error");
                clientSideError += 1;
            }
            if (clientSideError > 0) {
                return;
            }
            Site.SubmitButton.afterClick("buttonSubmitNewFolder");
            var parameters = {
                parentId: UI.parentId,
                folderNameFa: folderNameFa,
                folderNameEn: folderNameEn
            };
            $.ajax({
                url: "./api/Machinery/InsertFolder",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        UI.countUpdateAvailable += 1;
                        var msg = format("پوشه جدید ثبت شد");
                        $("#alertSuccess2").html(msg);
                        $("#alertSuccess2").velocity("fadeIn");
                        ModalNewFolder.clearAfterSubmit();
                    }
                    else if (data.error === -1) {
                        window.location.href = data.redirect;
                    }
                    Site.SubmitButton.afterCompelte("buttonSubmitNewFolder");
                }
            });
        };
        ModalNewFolder.load = function () {
            UI.countUpdateAvailable = 0;
            ModalNewFolder.bindAll();
        };
        ModalNewFolder.clearAll = function () {
            ModalNewFolder.clearAfterSubmit();
            $("#alertSuccess2").velocity("fadeOut", { duration: 0 });
            Site.SubmitButton.afterCompelte("buttonSubmitNewFolder");
        };
        ModalNewFolder.clearAfterSubmit = function () {
            Site.Popover.remove("aMachineryAlertFolderNameFa");
            $("#inputFolderNameFa").parent().removeClass("has-error");
            ModalNewFolder.viewModel.folderNameFa("");
            ModalNewFolder.viewModel.folderNameEn("");
        };
        ModalNewFolder.modal_closed = function () {
            ModalNewFolder.clearAll();
            ModalNewFolder.unBindAll();
            if (UI.countUpdateAvailable > 0) {
                UI.getMachinery();
            }
        };
        ModalNewFolder.bindAll = function () {
            ko.applyBindings(ModalNewFolder.viewModel, document.getElementById("divModalNewFolder"));
            $("#buttonSubmitNewFolder").bind("click", ModalNewFolder.buttonSubmit_clicked);
            $("#divModalNewFolder").on("hidden.bs.modal", ModalNewFolder.modal_closed);
        };
        ModalNewFolder.unBindAll = function () {
            ko.cleanNode(document.getElementById("divModalNewFolder"));
            $("#buttonSubmitNewFolder").unbind("click");
            $("#divModalNewFolder").unbind("hidden.bs.modal");
        };
        ModalNewFolder.viewModel = {
            folderNameFa: ko.observable(""),
            folderNameEn: ko.observable("")
        };
        return ModalNewFolder;
    }());
    MainBodyAdminMachinery.ModalNewFolder = ModalNewFolder;
    var ModalNewUnit = (function () {
        function ModalNewUnit() {
        }
        ModalNewUnit.load = function () {
            UI.countUpdateAvailable = 0;
            ModalNewUnit.bindAll();
        };
        ModalNewUnit.bindAll = function () {
            $("#buttonSubmitNewUnit").bind("click", ModalNewUnit.buttonSubmit_clicked);
            $("#divModalNewUnit").on("hidden.bs.modal", ModalNewUnit.modal_closed);
        };
        ModalNewUnit.unBindAll = function () {
            $("#buttonSubmitNewUnit").unbind("click");
            $("#divModalNewUnit").unbind("hidden.bs.modal");
        };
        ModalNewUnit.clearAll = function () {
            Site.Popover.remove("aMachineryAlertUnitNameFa");
            $("#inputUnitNameFa").parent().removeClass("has-error");
            $("#inputUnitNameFa").val("");
            $("#inputUnitNameEn").val("");
            $("#alertSuccess1").velocity("fadeOut", { duration: 0 });
        };
        ModalNewUnit.clearAfterSubmit = function () {
            Site.Popover.remove("aMachineryAlertUnitNameFa");
            $("#inputUnitNameFa").parent().removeClass("has-error");
            $("#inputUnitNameFa").val("");
            $("#inputUnitNameEn").val("");
        };
        ModalNewUnit.buttonSubmit_clicked = function () {
            $("#alertSuccess1").velocity("fadeOut", { duration: 0 });
            Site.Popover.remove("aMachineryAlertUnitNameFa");
            var unitNameFa = $("#inputUnitNameFa").val();
            var unitNameEn = $("#inputUnitNameEn").val();
            var clientSideError = 0;
            if (unitNameFa.length === 0) {
                Site.Popover.create("divAlertUnitNameFa1", "aMachineryAlertUnitNameFa", "spanAlertUnitNameFa");
                $("#inputUnitNameFa").parent().addClass("has-error");
                clientSideError += 1;
            }
            if (clientSideError > 0) {
                return;
            }
            Site.SubmitButton.afterClick("buttonSubmitNewUnit");
            var parameters = {
                parentId: UI.parentId,
                unitNameFa: unitNameFa,
                unitNameEn: unitNameEn
            };
            $.ajax({
                url: "./api/Machinery/InsertUnit",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        UI.countUpdateAvailable += 1;
                        var msg = format("بخش جدید ثبت شد");
                        $("#alertSuccess1").html(msg);
                        $("#alertSuccess1").velocity("fadeIn");
                        ModalNewUnit.clearAfterSubmit();
                    }
                    else if (data.error === -1) {
                        window.location.href = data.redirect;
                    }
                    Site.SubmitButton.afterCompelte("buttonSubmitNewUnit");
                }
            });
        };
        ModalNewUnit.modal_closed = function (e) {
            ModalNewUnit.clearAll();
            ModalNewUnit.unBindAll();
            if (UI.countUpdateAvailable > 0) {
                UI.getMachinery();
            }
        };
        return ModalNewUnit;
    }());
    MainBodyAdminMachinery.ModalNewUnit = ModalNewUnit;
    var ModalNewMachine = (function () {
        function ModalNewMachine() {
        }
        ModalNewMachine.load = function () {
            UI.countUpdateAvailable = 0;
            ModalNewMachine.bindAll();
        };
        ModalNewMachine.bindAll = function () {
            ko.applyBindings(ModalNewMachine.viewModel, document.getElementById("divModalNewMachine"));
            $("#buttonSubmitNewMachine").bind("click", ModalNewMachine.buttonSubmit_clicked);
            $("#divModalNewMachine").on("hidden.bs.modal", ModalNewMachine.modal_closed);
        };
        ModalNewMachine.clearAll = function () {
            ModalNewMachine.clearAfterSubmit();
            $("#alertSuccess3").velocity("fadeOut", { duration: 0 });
            Site.SubmitButton.afterCompelte("buttonSubmitNewMachine");
        };
        ModalNewMachine.clearAfterSubmit = function () {
            Site.Popover.remove("aMachineryAlertMachineNameFa");
            $("#inputMachineNameFa").parent().removeClass("has-error");
            Site.Popover.remove("aMachineryAlertPMCode");
            $("#inputPMCode").parent().removeClass("has-error");
            ModalNewMachine.viewModel.machineNameFa("");
            ModalNewMachine.viewModel.machineNameEn("");
            ModalNewMachine.viewModel.pmCode("");
        };
        ModalNewMachine.modal_closed = function () {
            ModalNewMachine.clearAll();
            ModalNewMachine.unBindAll();
            if (UI.countUpdateAvailable > 0) {
                UI.getMachinery();
            }
        };
        ModalNewMachine.buttonSubmit_clicked = function () {
            $("#alertSuccess3").velocity("fadeOut", { duration: 0 });
            Site.Popover.remove("aMachineryAlertMachineNameFa");
            $("#inputMachineNameFa").parent().removeClass("has-error");
            Site.Popover.remove("aMachineryAlertPMCode");
            $("#inputPMCode").parent().removeClass("has-error");
            var machineNameFa = ModalNewMachine.viewModel.machineNameFa();
            var machineNameEn = ModalNewMachine.viewModel.machineNameEn();
            var pmCode = ModalNewMachine.viewModel.pmCode();
            var clientSideError = 0;
            if (machineNameFa.length === 0) {
                Site.Popover.create("divAlertMachineNameFa1", "aMachineryAlertMachineNameFa", "spanAlertMachineNameFa");
                $("#inputMachineNameFa").parent().addClass("has-error");
                clientSideError += 1;
            }
            if (clientSideError > 0) {
                return;
            }
            Site.SubmitButton.afterClick("buttonSubmitNewMachine");
            var parameters = {
                parentId: UI.parentId,
                machineNameFa: machineNameFa,
                machineNameEn: machineNameEn,
                pmCode: pmCode
            };
            $.ajax({
                url: "./api/Machinery/InsertMachine",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        UI.countUpdateAvailable += 1;
                        var msg = format("ماشین جدید ثبت شد");
                        $("#alertSuccess3").html(msg);
                        $("#alertSuccess3").velocity("fadeIn");
                        ModalNewMachine.clearAfterSubmit();
                    }
                    else if (data.error === 3) {
                        Site.Popover.create("divAlertPMCode1", "aMachineryAlertPMCode", "spanAlertPMCode");
                        $("#inputPMCode").parent().addClass("has-error");
                    }
                    else if (data.error === -1) {
                        window.location.href = data.redirect;
                    }
                    Site.SubmitButton.afterCompelte("buttonSubmitNewMachine");
                }
            });
        };
        ModalNewMachine.unBindAll = function () {
            ko.cleanNode(document.getElementById("divModalNewMachine"));
            $("#buttonSubmitNewMachine").unbind("click");
            $("#divModalNewMachine").unbind("hidden.bs.modal");
        };
        ModalNewMachine.viewModel = {
            machineNameFa: ko.observable(""),
            machineNameEn: ko.observable(""),
            pmCode: ko.observable("")
        };
        return ModalNewMachine;
    }());
    MainBodyAdminMachinery.ModalNewMachine = ModalNewMachine;
    var ModalEditUnit = (function () {
        function ModalEditUnit() {
        }
        ModalEditUnit.load = function () {
            UI.countUpdateAvailable = 0;
            ModalEditUnit.bindAll();
        };
        ModalEditUnit.bindAll = function () {
            ko.applyBindings(ModalEditUnit.viewModel, document.getElementById("divModalEditUnit"));
            $("#buttonSubmitEditUnit").bind("click", ModalEditUnit.buttonSubmit_clicked);
            $("#divModalEditUnit").on("hidden.bs.modal", ModalEditUnit.modal_closed);
        };
        ModalEditUnit.clearAll = function () {
        };
        ModalEditUnit.unBindAll = function () {
            ko.cleanNode(document.getElementById("divModalEditUnit"));
            $("#buttonSubmitEditUnit").unbind("click");
            $("#divModalEditUnit").unbind("hidden.bs.modal");
        };
        ModalEditUnit.buttonSubmit_clicked = function () {
        };
        ModalEditUnit.modal_closed = function () {
            ModalEditUnit.clearAll();
            ModalEditUnit.unBindAll();
            if (UI.countUpdateAvailable > 0) {
                UI.getMachinery();
            }
        };
        ModalEditUnit.viewModel = {
            unitNameFa: ko.observable(""),
            uniNameEn: ko.observable("")
        };
        return ModalEditUnit;
    }());
    MainBodyAdminMachinery.ModalEditUnit = ModalEditUnit;
})(MainBodyAdminMachinery || (MainBodyAdminMachinery = {}));
//# sourceMappingURL=machinery.js.map