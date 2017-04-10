/// <reference path="../../../../DefinitelyTyped/velocity-animate/index.d.ts" />
/// <reference path="../../../../DefinitelyTyped/handlebars/index.d.ts" />
/// <reference path="../../../../DefinitelyTyped/bootstrap/index.d.ts" />
/// <reference path="../nm.d.ts" />
/// <reference path="../common.d.ts" />
declare var format: any;
declare namespace MainBodyShowUsers {
    class UI {
        static load(complete: Function): void;
        static showLoading(): void;
        static hideLoading(): void;
        static loadNewData(): void;
        static loadEditedData(userId: string): void;
        static enableEditDeleteInNavbar(value: boolean): void;
        static bindTableRow_click(element: any): void;
        static unBindAllTableRow_click(): void;
        static emptyTable(): void;
        static bindAll(): void;
        static applyTableStrip(): void;
        static bindaCreateUser(): void;
        static bindaEditUser(): void;
        static bindaPermissions(): void;
        static unBindaPermissions(): void;
        static bindaChangePassword(): void;
        static unBindaChangePassword(): void;
        static unBindaEditUser(): void;
        static bindaDeleteUser(): void;
        static unBindaDeleteUser(): void;
        static deleteTableRow(): void;
        static unBindaCreateUser(): void;
        static unBindAll(): void;
    }
}
declare namespace ModalNewUser {
    class UI {
        static clearAll(): void;
        static bindAll(): void;
        static unBindAll(): void;
        static modal_closed(e: any): void;
        static buttonSubmit_clicked(): void;
    }
}
declare namespace ModalEditUser {
    class UI {
        static loadDataBeforeEdit(): void;
        static clearAll(): void;
        static bindAll(): void;
        static unBindAll(): void;
        static modal_closed(e: any): void;
        static buttonSubmit_clicked(): void;
    }
}
declare namespace ModalChangePassword {
    class UI {
        static clearAll(): void;
        static bindAll(): void;
        static unBindAll(): void;
        static modal_closed(e: any): void;
        static setDataBeforeEdit(userId: string): void;
        static clearDataBeforeEdit(): void;
        static getDataBeforeEdit(): any;
        static buttonSubmit_clicked(): void;
    }
}
declare namespace ModalPermissions {
    class UI {
        static clearAll(): void;
        static clearUlListPermissions(): void;
        static fetchData(filter?: any): void;
        static setDataPermissionsList(data: any): void;
        static getDataPermissionsList(): any;
        static clearDataPermissionsList(): void;
        static bindCheckboxesForPermission(): void;
        static bindAll(): void;
        static bindSearchBox(): void;
        static unBindSearchBox(): void;
        static unBindAll(): void;
        static savePermissions(): void;
        static modal_closed(e: any): void;
        static setDataBeforeEdit(userId: string): void;
        static clearIdleUser(): void;
        static clearDataBeforeEdit(): void;
        static getDataBeforeEdit(): any;
    }
}
