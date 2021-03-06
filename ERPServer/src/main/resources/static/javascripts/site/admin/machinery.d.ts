/// <reference path="../../../../DefinitelyTyped/velocity-animate/index.d.ts" />
/// <reference path="../../../../DefinitelyTyped/bootstrap/index.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/index.d.ts" />
/// <reference path="../../../../DefinitelyTyped/handlebars/index.d.ts" />
/// <reference path="../nm.d.ts" />
/// <reference path="../common.d.ts" />
declare namespace MainBodyAdminMachinery {
    class UI {
        static initialLoadIsDone: boolean;
        static parentId: string;
        static listParents: any[];
        static countChildren: any[];
        static countUpdateAvailable: number;
        static selectedMachineryId: string;
        static load(complete: Function): void;
        static bindAll(): void;
        static bindaCreateMachine(): void;
        static bindaDeleteMachinery(): void;
        static aDeleteMachinery_clicked(): void;
        static aDeleteMachinery2_clicked(): void;
        static aEditUnit_clicked(): void;
        static aEditMachine_clicked(): void;
        static aEditFolder_clicked(): void;
        static bindaEditMachinery(): void;
        static bindaCreateFolder(): void;
        static bindaCreateUnit(): void;
        static activateNavbarItems(): void;
        static deactivateNavbarItems(): void;
        static aCreateUnit_clicked(): void;
        static aCreateFolder_clicked(): void;
        static aCreateMachine_clicked(): void;
        static machinerySelected(element: any): void;
        static unBindAll(): void;
        static bindListMachineryItems(): void;
        static bindParentLocationItems(): void;
        static getMachinery(onComplete?: Function): void;
    }
    class ModalConfirmDelete {
        static bindAll(): void;
        static bindButtonConfirmDeleteMachinery(): void;
        static modal_closed(e: any): void;
        static clearAll(): void;
        static unBindAll(): void;
    }
    class ModalNewFolder {
        static viewModel: {
            folderNameFa: KnockoutObservable<string>;
            folderNameEn: KnockoutObservable<string>;
        };
        static buttonSubmit_clicked(): void;
        static load(): void;
        static clearAll(): void;
        static clearAfterSubmit(): void;
        static modal_closed(): void;
        static bindAll(): void;
        static unBindAll(): void;
    }
    class ModalNewUnit {
        static load(): void;
        static bindAll(): void;
        static unBindAll(): void;
        static clearAll(): void;
        static clearAfterSubmit(): void;
        static buttonSubmit_clicked(): void;
        static modal_closed(e: any): void;
    }
    class ModalNewMachine {
        static viewModel: {
            machineNameFa: KnockoutObservable<string>;
            machineNameEn: KnockoutObservable<string>;
            pmCode: KnockoutObservable<string>;
        };
        static load(): void;
        static bindAll(): void;
        static clearAll(): void;
        static clearAfterSubmit(): void;
        static modal_closed(): void;
        static buttonSubmit_clicked(): void;
        static unBindAll(): void;
    }
    class ModalEditUnit {
        static viewModel: {
            unitNameFa: KnockoutObservable<string>;
            uniNameEn: KnockoutObservable<string>;
        };
        static load(): void;
        static bindAll(): void;
        static clearAll(): void;
        static unBindAll(): void;
        static buttonSubmit_clicked(): void;
        static modal_closed(): void;
    }
    interface Unit {
        unitNameFa: string;
        unitNameEn: string;
    }
    interface Machine {
        machineNameFa: string;
        machineNameEn: string;
        pmCode: string;
    }
    interface Folder {
        folderNameFa: string;
        folderNameEn: string;
    }
}
