//<reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../nm.d.ts"/>
///<reference path="../common.d.ts"/>

namespace MainBodyAdminMachinery {
    export class UI {

        static initialLoadIsDone = false;
        static parentId: string = "";
        static listParents = [];
        static countChildren = [];
        static countNewMachinery = 0;

        static load(complete: Function) {

            let p = new NM.Parallel(5);
            p.setOnComplete(function () {

                MainBodyAdminMachinery.UI.getMachinery(() => {
                    $("#divMainBodyAdminMachinery").velocity("fadeIn", {duration: 250});
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
        }

        static bindAll() {
            MainBodyAdminMachinery.UI.bindaCreateUnit();
        }

        static bindaCreateUnit() {

            $("#aCreateUnit").click(function (eventObject) {
                if ($("#divModalNewUnit").length === 0) {

                    $("#aLoadingNavbarMainBodyMachinery").velocity({opacity: 1}, {duration: 50});

                    $.ajax({
                        url: "./hbs/mainBody/admin/machinery/modalNewUnit.hbs" + "?" + Site.Statics.version,
                        method: "GET",
                        success: function (data, textStatus, jqXHR) {
                            $("#mainBody").append(data);
                            $("#aLoadingNavbarMainBodyMachinery").velocity({opacity: 0}, {duration: 50});
                            MainBodyAdminMachinery.UI.aCreateUnit_clicked();
                        }
                    });
                }
                else {
                    MainBodyAdminMachinery.UI.aCreateUnit_clicked();
                }
            });
        }

        static aCreateUnit_clicked() {
            ModalNewUnit.load();
            $("#divModalNewUnit").modal("show");
        }

        static machinerySelected(element)
        {
            let a = $("#ulListMachinery").find("a");

            $(a).each(function (index, elem) {
                if ($(elem).hasClass("machinery-selected"))
                {
                    $(elem).removeClass("machinery-selected");
                }
            });

            $(element).addClass("machinery-selected");
        }

        static unBindAll() {
            UI.initialLoadIsDone = false;
            $("#aCreateUnit").unbind("click");
        }

        static bindListMachineryItems() {
            let a = $("#ulListMachinery").find("a");

            $(a).each(function (index, elem) {

                $(elem).click(function (eventObject) {
                    UI.machinerySelected(this);
                });

                if ($(elem).attr("data-nm-up")) {
                    $(elem).click(function (eventObject) {

                        let id = this.getAttribute("data-nm-id");

                        UI.parentId = id;
                        UI.getMachinery();
                    });
                }
                else {
                    $(elem).dblclick(function (eventObject) {
                        let id = this.getAttribute("data-nm-id");

                        if (UI.countChildren[id] > 0) {
                            UI.parentId = id;
                            UI.getMachinery();
                        }
                    })
                }
            });
        }

        static bindParentLocationItems() {
            $("#divParentLocation").find("a").click(function (eventObject) {
                let id = this.getAttribute("data-nm-id");

                UI.parentId = id;
                UI.getMachinery();
            });
        }

        static getMachinery(onComplete: Function = null) {

            if (UI.initialLoadIsDone) {
                Site.Loader.showLoaderForContent("machineryBrowser", 15, 40);
            }

            let sourceLocationUP = $("#templateLocationUP").html();
            let templateLocationUP = Handlebars.compile(sourceLocationUP);

            let sourceUnit = $("#templateUnit").html();
            let templateUnit = Handlebars.compile(sourceUnit);

            let sourceMachine = $("#templateMachine").html();
            let templateMachine = Handlebars.compile(sourceMachine);

            let sourceFolder = $("#templateFolder").html();
            let templateFolder = Handlebars.compile(sourceFolder);

            let sourceParentLocation = $("#templateParentLocation").html();
            let templateParentLocation = Handlebars.compile(sourceParentLocation);

            let ulListMachinery = $("#ulListMachinery");
            let divParentLocation = $("#divParentLocation");

            $(ulListMachinery).empty();
            $(divParentLocation).empty();

            let parameters = {parentId: UI.parentId};
            $.ajax({
                url: "./api/Machinery/GetMachinery",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {

                    if (data.error === 0) {
                        let machinery = data.machinery;
                        let parents = data.parents;
                        UI.listParents = parents;
                        UI.countChildren = data.countChildren;
                        $("#machineryBrowser").velocity("fadeOut", 10);

                        let context = {
                            id: "",
                            value: "شاخه اصلی"
                        };

                        let html = templateParentLocation(context);
                        $(divParentLocation).append(html);

                        for (let i = 0; i < parents.length; i++) {
                            let context = {
                                id: parents[i].id,
                                value: parents[i].value
                            };

                            let html = templateParentLocation(context);
                            $(divParentLocation).append(html);
                        }

                        // show up button
                        if (UI.parentId !== "") {

                            let idUP = "";

                            if (UI.listParents.length == 1) {
                                idUP = "";
                            }
                            else {
                                idUP = UI.listParents[UI.listParents.length - 2].id
                            }

                            let context = {
                                id: idUP
                            };
                            let html = templateLocationUP(context);

                            $(ulListMachinery).append(html);
                        }

                        for (let i = 0; i < machinery.length; i++) {

                            let id = machinery[i].id;

                            if (machinery[i].machineryType === "Unit") {
                                let unit: Unit = machinery[i].unit;
                                let countChildren = "";

                                if (UI.countChildren[id] > 0) {
                                    countChildren = UI.countChildren[id];
                                }

                                let context = {
                                    id: id,
                                    unitNameFa: unit.unitNameFa,
                                    unitNameEn: unit.unitNameEn,
                                    countChildren: countChildren
                                };
                                let html = templateUnit(context);

                                $(ulListMachinery).append(html);
                            }
                            else if (machinery[i].machineryType === "Machine") {
                                let machine: Machine = machinery[i].machine;
                                let countChildren = "";

                                if (UI.countChildren[id] > 0) {
                                    countChildren = UI.countChildren[id];
                                }

                                let context = {
                                    id: id,
                                    machineNameFa: machine.machineNameFa,
                                    machineNameEn: machine.machineNameEn,
                                    pmCode: machine.pmCode,
                                    countChildren: countChildren
                                };

                                let html = templateMachine(context);

                                $(ulListMachinery).append(html);
                            }
                            else if (machinery[i].machineryType === "Folder") {
                                let folder: Folder = machinery[i].folder;
                                let countChildren = "";

                                if (UI.countChildren[id] > 0) {
                                    countChildren = UI.countChildren[id];
                                }

                                let context = {
                                    id: id,
                                    folderNameFa: folder.folderNameFa,
                                    folderNameEn: folder.folderNameEn,
                                    countChildren: countChildren
                                };
                                let html = templateFolder(context);

                                $(ulListMachinery).append(html);
                            }
                        }

                        // clear
                        UI.countNewMachinery = 0;

                        UI.bindListMachineryItems();
                        UI.bindParentLocationItems();
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
        }
    }

    export class ModalNewUnit {

        static load() {
            // initialize again
            UI.countNewMachinery = 0;

            ModalNewUnit.bindAll();
        }

        static bindAll() {
            $("#buttonSubmitNewUnit").bind("click", ModalNewUnit.buttonSubmit_clicked);
            $("#divModalNewUnit").on("hidden.bs.modal", ModalNewUnit.modal_closed);
        }

        static unBindAll() {
            $("#buttonSubmitNewUnit").unbind("click");
            $("#divModalNewUnit").unbind("hidden.bs.modal");
        }

        static clearAll() {
            Site.Popover.remove("aMachineryAlertUnitNameFa");
            $("#inputUnitNameFa").parent().removeClass("has-error");
            $("#inputUnitNameFa").val("");
            $("#inputUnitNameEn").val("");
            $("#alertSuccess").velocity("fadeOut", {duration: 0});
        }

        static clearAfterSubmit() {
            Site.Popover.remove("aMachineryAlertUnitNameFa");
            $("#inputUnitNameFa").parent().removeClass("has-error");
            $("#inputUnitNameFa").val("");
            $("#inputUnitNameEn").val("");
        }

        static buttonSubmit_clicked() {

            // clear
            $("#alertSuccess").velocity("fadeOut", {duration: 0});
            //

            let unitNameFa = $("#inputUnitNameFa").val();
            let unitNameEn = $("#inputUnitNameEn").val();

            let clientSideError = 0;

            if (unitNameFa.length === 0) {
                Site.Popover.create("divAlertUnitNameFa1", "aMachineryAlertUnitNameFa", "spanAlertUnitNameFa");
                $("#inputUnitNameFa").parent().addClass("has-error");
                clientSideError += 1;
            }

            if (clientSideError > 0) {
                return;
            }

            Site.SubmitButton.afterClick("buttonSubmitNewUnit");

            let parameters = {
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
                        UI.countNewMachinery += 1;

                        let msg: string = format("بخش جدید ثبت شد");
                        $("#alertSuccess").html(msg);
                        $("#alertSuccess").velocity("fadeIn");
                        ModalNewUnit.clearAfterSubmit();
                    }
                    else if (data.error === -1) {
                        window.location.href = data.redirect;
                    }

                    Site.SubmitButton.afterCompelte("buttonSubmitNewUnit");
                }
            })
        }

        static modal_closed(e) {
            ModalNewUnit.clearAll();
            ModalNewUnit.unBindAll();

            if (UI.countNewMachinery > 0) {
                UI.getMachinery();
            }
        }
    }

    export interface Unit {
        unitNameFa: string;
        unitNameEn: string;
    }

    export interface Machine {
        machineNameFa: string;
        machineNameEn: string;
        pmCode: string;
    }

    export interface Folder {
        folderNameFa: string;
        folderNameEn: string;
    }
}