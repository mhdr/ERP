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
        static load(complete: Function): void;
        static bindAll(): void;
        static bindaCreateUnit(): void;
        static aCreateUnit_clicked(): void;
        static unBindAll(): void;
        static bindListMachineryItems(): void;
        static bindParentLocationItems(): void;
        static getMachinery(onComplete?: Function): void;
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
