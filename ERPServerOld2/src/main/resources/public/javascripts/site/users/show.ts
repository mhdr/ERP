///<reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts"/>
///<reference path="../common.d.ts"/>

$(document).ready(function () {
    UsersShow.UI.registerKOHandlers();
    ko.applyBindings(UsersShow.viewModel, document.getElementById("mainBody"));
    UsersShow.viewModel.show_mainbody(true);

    $.ajax({
        url: "/api/getUsers",
        method: "GET",
        success: function (data, textStatus, jqXHR) {
            if (data.error === 0) {
                UsersShow.viewModel.add_users(data.users);
            }
        }
    })
});

namespace UsersShow {
    export var viewModel = {
        show_mainbody: ko.observable(false),
        show_loader: ko.observable(false),
        show_loaderNav: ko.observable(false),

        /**
         * table row is selected
         */
        tr_selected: ko.observable(false),
        selected_tr_id: "",
        tr_clicked: function () {
            UsersShow.UI.swapSelectdTableRow(this.id);
        },
        change_color: ko.observable(false),
        users: ko.observableArray(),
        add_users: function (data) {

            var length = data.length;

            for (var i = 0; i < length; i++) {
                UsersShow.viewModel.add_user(data[i]);
            }
        },
        add_user: function (data) {
            if (data === undefined) {
                return
            }

            var userName = data.userName;
            var firstName = data.firstName;
            var lastName = data.lastName;
            var id = data.id;

            var newData = {
                id: id,
                userName: userName,
                firstName: firstName,
                lastName: lastName
            };

            UsersShow.viewModel.users.unshift(newData);
        },
        remove_user: function () {
            UsersShow.viewModel.users.remove(this);
        },
    };

    export class UI {

        static registerKOHandlers() {
            ko.bindingHandlers.changeTableRowClassOnSelect = {
                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var value = valueAccessor();
                    var valueUnwrapped = ko.unwrap(value);

                    var selectedtrId = bindingContext.$root.selected_tr_id;
                    var currentElementId=$(element).attr("data-nm-id");

                    // Now manipulate the DOM element
                    if (valueUnwrapped == true) {
                        if (currentElementId === selectedtrId) {
                            $(element).addClass("us-selected-tr");
                        }
                    }
                    else {
                        $(element).removeClass("us-selected-tr");
                    }
                }
            };
        }

        static swapSelectdTableRow(id) {
            UsersShow.viewModel.tr_selected(true);
            UsersShow.viewModel.selected_tr_id = id;
            UsersShow.viewModel.change_color(false);
            UsersShow.viewModel.change_color(true);
        }
    }
}