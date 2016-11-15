/// <reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../../DefinitelyTyped/handlebars/handlebars.d.ts" />
/// <reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts" />
/// <reference path="../common.d.ts" />
declare namespace UsersShow {
    var viewModel: {
        show_mainbody: KnockoutObservable<boolean>;
        show_loader: KnockoutObservable<boolean>;
        show_loaderNav: KnockoutObservable<boolean>;
        tr_selected: KnockoutObservable<boolean>;
        selected_tr_id: string;
        tr_clicked: () => void;
        change_color: KnockoutObservable<boolean>;
        users: KnockoutObservableArray<{}>;
        add_users: (data: any) => void;
        add_user: (data: any) => void;
        remove_user: () => void;
    };
    class UI {
        static registerKOHandlers(): void;
        static swapSelectdTableRow(id: any): void;
    }
}
