/// <reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts" />
/// <reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts" />
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
        static bindaDeleteMachinery(): void;
        static aDeleteMachinery_clicked(): void;
        static aDeleteMachinery2_clicked(): void;
        static bindaCreateUnit(): void;
        static activateNavbarItems(): void;
        static deactivateNavbarItems(): void;
        static aCreateUnit_clicked(): void;
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
    class ModalNewUnit {
        static load(): void;
        static bindAll(): void;
        static unBindAll(): void;
        static clearAll(): void;
        static clearAfterSubmit(): void;
        static buttonSubmit_clicked(): void;
        static modal_closed(e: any): void;
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
