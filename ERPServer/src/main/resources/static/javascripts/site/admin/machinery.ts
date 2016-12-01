//<reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts"/>
///<reference path="../nm.d.ts"/>
///<reference path="../common.d.ts"/>

namespace MainBodyAdminMachinery {
    export class UI {

        static initialLoadIsDone=false;
        static parentId: string = "";
        static listParents = [];
        static countChildren = [];

        static load(complete: Function) {
            MainBodyAdminMachinery.UI.getMachinery(() => {
                $("#divMainBodyAdminMachinery").velocity("fadeIn", {duration: 250});
                UI.initialLoadIsDone=true;
                complete();
            });
        }

        static bindAll() {

        }

        static unBindAll() {
            UI.initialLoadIsDone=false;
        }

        static bindListMachineryItems() {
            let a=$("#ulListMachinery").find("a");

            $(a).each(function (index, elem) {
                if ($(elem).attr("data-nm-up"))
                {
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

            if (UI.initialLoadIsDone)
            {
                Site.UI.showLoaderForContent("machineryBrowser",15,40);
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
                        $("#machineryBrowser").velocity("fadeOut",10);

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

                        UI.bindListMachineryItems();
                        UI.bindParentLocationItems();
                    }

                    if (UI.initialLoadIsDone)
                    {
                        Site.UI.hideLoaderForContent();
                    }

                    $("#machineryBrowser").velocity("fadeIn",250);

                    if (onComplete !== null) {
                        onComplete();
                    }
                }
            });
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