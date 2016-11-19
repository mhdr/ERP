//<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="./nm.d.ts"/>
///<reference path="./common.d.ts"/>

window['format'];
var format: any;

namespace MainBodyShowUsers {
    export class UI {

        static load(complete: Function) {
            MainBodyShowUsers.UI.emptyTable();

            $.ajax({
                url: "./hbs/mainBodyShowUsersTable.hbs",
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    var template = Handlebars.compile(data);

                    $.ajax({
                        url: "./api/User/GetUsers",
                        method: "POST",
                        success: function (data2, textStatus, jqXHR) {

                            if (data2.error === 0) {
                                var users = data2.users;

                                for (var i = 0; i < users.length; i++) {
                                    var value = users[i];
                                    var context = {
                                        userName: value.userName, firstName: value.firstName,
                                        lastName: value.lastName, userId: value.id,
                                        style: ""
                                    };
                                    var html = template(context);
                                    $("#tbodyMainBodyShowUsers").append(html);

                                    var el = $(format("tr[data-nm-userId={0}]", value.id));
                                    MainBodyShowUsers.UI.bindTableRow_click(el);
                                }

                                $("#divMainBodyShowUsers").velocity("fadeIn", {duration: 250});
                                MainBodyShowUsers.UI.applyTableStrip();
                                complete();
                            }
                        }
                    });
                }
            });
        }

        static showLoading() {
            $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 1}, {duration: 100});
        }

        static hideLoading() {
            $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 0}, {duration: 100});
        }

        static loadNewData() {
            $.ajax({
                url: "./hbs/mainBodyShowUsersTable.hbs",
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    var template = Handlebars.compile(data);

                    $.ajax({
                        url: "./api/User/GetUsers",
                        method: "POST",
                        success: function (data2, textStatus, jqXHR) {

                            if (data2.error === 0) {
                                var trBeforeLoadNewData = $("#tbodyMainBodyShowUsers tr");

                                var data2Result = data2.users;

                                for (var i = 0; i < data2Result.length; i++) {
                                    var count = 0;
                                    var value = data2Result[i];

                                    $(trBeforeLoadNewData).each(function (index3, elem3) {
                                        var userId = $(elem3).attr("data-nm-userId");

                                        if (userId === value.id) {
                                            count++;
                                            // do not continue if already in the table
                                            return false;
                                        }
                                    });

                                    // if item is new
                                    if (count === 0) {
                                        var context = {
                                            userName: value.userName, firstName: value.firstName,
                                            lastName: value.lastName, userId: value.id,
                                            style: format("background-color:#dfecdf;display:none;")
                                        };
                                        var html = template(context);
                                        $("#tbodyMainBodyShowUsers").prepend(html);
                                        var el = $(format("tr[data-nm-userId={0}]", value.id));
                                        $(el).velocity("fadeIn", {duration: 1000}).velocity({backgroundColor: "#ffffff"}, {
                                            duration: 1000, complete: function () {
                                                MainBodyShowUsers.UI.applyTableStrip();

                                                MainBodyShowUsers.UI.bindTableRow_click(el);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }

        static loadEditedData(userId: string) {
            var element = $(format("tr[data-nm-userId={0}]", userId));
            var dataAfterEdit = JSON.parse($("#inputModalUserAfterEdit").val());

            $(element).find(".nm-data-firstName").text(dataAfterEdit.firstName);
            $(element).find(".nm-data-lastName").text(dataAfterEdit.lastName);
        }

        static enableEditDeleteInNavbar(value: boolean) {
            var aEditUser = $("#aEditUser");
            var aDeleteUser = $("#aDeleteUser");
            var aChangePassword = $("#aChangePassword");
            var aPermissions = $("#aPermissions");

            if (value) {
                if ($(aDeleteUser).hasClass("nm-disable-a")) {
                    $(aDeleteUser).removeClass("nm-disable-a");
                }

                if ($(aEditUser).hasClass("nm-disable-a")) {
                    $(aEditUser).removeClass("nm-disable-a");
                }

                if ($(aChangePassword).hasClass("nm-disable-a")) {
                    $(aChangePassword).removeClass("nm-disable-a");
                }

                if ($(aPermissions).hasClass("nm-disable-a")) {
                    $(aPermissions).removeClass("nm-disable-a");
                }
            }
            else {
                // disable edit and delete buttons
                if (!$(aDeleteUser).hasClass("nm-disable-a")) {
                    $(aDeleteUser).addClass("nm-disable-a");
                }

                if (!$(aEditUser).hasClass("nm-disable-a")) {
                    $(aEditUser).addClass("nm-disable-a");
                }

                if (!$(aChangePassword).hasClass("nm-disable-a")) {
                    $(aChangePassword).addClass("nm-disable-a");
                }

                if (!$(aPermissions).hasClass("nm-disable-a")) {
                    $(aPermissions).addClass("nm-disable-a");
                }
            }
        }

        static bindTableRow_click(element) {
            $(element).bind("click", function (eventObject) {
                var trs = $("#tbodyMainBodyShowUsers").find("tr");
                trs.each(function (index, elem) {
                    if ($(elem).hasClass("table-row-selected")) {
                        $(elem).removeClass("table-row-selected");
                    }
                });

                $(element).addClass("table-row-selected");

                MainBodyShowUsers.UI.enableEditDeleteInNavbar(true);
            })
        }

        static unBindAllTableRow_click() {
            var trs = $("#tbodyMainBodyShowUsers").find("tr");

            $(trs).each(function (index, elem) {
                $(elem).unbind("click");
            });
        }

        static emptyTable() {
            $("#tbodyMainBodyShowUsers").empty();
        }

        static bindAll() {
            MainBodyShowUsers.UI.bindaCreateUser();
            MainBodyShowUsers.UI.bindaDeleteUser();
            MainBodyShowUsers.UI.bindaEditUser();
            MainBodyShowUsers.UI.bindaChangePassword();
            MainBodyShowUsers.UI.bindaPermissions();
        }

        static applyTableStrip() {
            var rows = $("#tableMainBodyShowUsers").find("tr");
            $(rows).each(function (index, elem) {

                $(elem).css("background-color", "");

                if ($(elem).hasClass("table-row-strip1")) {
                    $(elem).removeClass("table-row-strip1");
                }

                if ($(elem).hasClass("table-row-strip2")) {
                    $(elem).removeClass("table-row-strip2");
                }

                if (index % 2 == 0) {
                    $(elem).addClass("table-row-strip2");
                }
                else {
                    $(elem).addClass("table-row-strip1");
                }
            });
        }

        static bindaCreateUser() {

            $("#aCreateUser").bind("click", function () {
                if ($("#divModalNewUser").length == 0) {

                    $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 1}, {duration: 100});

                    $.ajax({
                        url: "./hbs/modalNewUser.hbs",
                        method: "GET",
                        success: function (data, textStatus, jqXHR) {
                            $("#divMainBodyShowUsers").append(data);
                            ModalNewUser.UI.bindAll();

                            $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 0}, {duration: 100});

                            $("#divModalNewUser").modal("show");
                        }
                    });
                }
                else {
                    ModalNewUser.UI.bindAll();
                    $("#divModalNewUser").modal("show");
                }
            });
        }

        static bindaEditUser() {
            $("#aEditUser").bind("click", function () {

                var selected = $(".table-row-selected");

                if (selected.length > 0) {

                    var firstName = $(selected).find(".nm-data-firstName").text();
                    var lastName = $(selected).find(".nm-data-lastName").text();
                    var userId = $(selected).attr("data-nm-userId");

                    var dataBeforeEdit = {
                        userId: userId,
                        firstName: firstName,
                        lastName: lastName
                    };

                    if ($("#divModalEditUser").length == 0) {


                        $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 1}, {duration: 100});

                        $.ajax({
                            url: "./hbs/modalEditUser.hbs",
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#divMainBodyShowUsers").append(data);
                                ModalEditUser.UI.bindAll();

                                $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 0}, {duration: 100});

                                $("#inputModalUserBeforeEdit").val(JSON.stringify(dataBeforeEdit));
                                ModalEditUser.UI.loadDataBeforeEdit();
                                $("#divModalEditUser").modal("show");
                            }
                        });
                    }
                    else {
                        ModalEditUser.UI.bindAll();
                        $("#inputModalUserBeforeEdit").val(JSON.stringify(dataBeforeEdit));
                        ModalEditUser.UI.loadDataBeforeEdit();
                        $("#divModalEditUser").modal("show");
                    }
                }
            });
        }

        static bindaPermissions() {
            $("#aPermissions").bind("click", function () {
                var selected = $(".table-row-selected");
                var userId = $(selected).attr("data-nm-userId");

                if (selected.length > 0) {
                    if ($("#divModalPermissions").length == 0) {
                        $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 1}, {duration: 100});

                        $.ajax({
                            url: "./hbs/modalPermissions.hbs",
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#divMainBodyShowUsers").append(data);
                                ModalPermissions.UI.bindAll();
                                ModalPermissions.UI.setDataBeforeEdit(userId);
                                ModalPermissions.UI.fetchData();
                                $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 0}, {duration: 100});
                                $("#divModalPermissions").modal("show");
                            }
                        });
                    }
                    else {
                        ModalPermissions.UI.bindAll();
                        ModalPermissions.UI.setDataBeforeEdit(userId);
                        ModalPermissions.UI.fetchData();
                        $("#divModalPermissions").modal("show");
                    }
                }
            });
        }

        static unBindaPermissions() {
            $("#aPermissions").unbind("click");
        }

        static bindaChangePassword() {
            $("#aChangePassword").bind("click", function () {

                var selected = $(".table-row-selected");
                var userId = $(selected).attr("data-nm-userId");

                if (selected.length > 0) {
                    if ($("#divModalChangePassword").length == 0) {


                        $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 1}, {duration: 100});

                        $.ajax({
                            url: "./hbs/modalChangePassword.hbs",
                            method: "GET",
                            success: function (data, textStatus, jqXHR) {
                                $("#divMainBodyShowUsers").append(data);
                                ModalChangePassword.UI.bindAll();
                                ModalChangePassword.UI.setDataBeforeEdit(userId);
                                $("#aLoadingNavbarMainBodyShowUsers").velocity({opacity: 0}, {duration: 100});
                                $("#divModalChangePassword").modal("show");
                            }
                        });
                    }
                    else {
                        ModalChangePassword.UI.bindAll();
                        ModalChangePassword.UI.setDataBeforeEdit(userId);
                        $("#divModalChangePassword").modal("show");
                    }
                }
            });
        }

        static unBindaChangePassword() {
            $("#aChangePassword").unbind("click");
        }

        static unBindaEditUser() {
            $("#aEditUser").unbind("click");
        }

        static bindaDeleteUser() {
            $("#aDeleteUser").bind("click", function (eventObject) {
                MainBodyShowUsers.UI.deleteTableRow();
            });
        }

        static unBindaDeleteUser() {
            $("#aDeleteUser").unbind("click");
        }

        static deleteTableRow() {
            var selected = $(".table-row-selected");

            if (selected.length > 0) {
                var url = "./api/User/DeleteUser";
                var userId = $(selected).attr("data-nm-userId");

                var parameters = {userId: userId};

                $.ajax({
                    url: url,
                    method: "POST",
                    data: parameters,
                    success: function (data, textStatus, jqXHR) {
                        if (data.error === 0) {

                            $(selected).removeClass("table-row-selected");

                            $(selected).velocity({backgroundColor: "#ffe6e6"}, {duration: 800})
                                .velocity("fadeOut", {
                                    duration: 800, complete: function (elems) {
                                        $(selected).remove();
                                        MainBodyShowUsers.UI.applyTableStrip();

                                        MainBodyShowUsers.UI.enableEditDeleteInNavbar(false);
                                    }
                                });
                        }
                    }
                });
            }
        }

        static unBindaCreateUser() {
            $("#aCrateUser").unbind("click");
        }

        static unBindAll() {
            MainBodyShowUsers.UI.unBindaCreateUser();
            MainBodyShowUsers.UI.unBindAllTableRow_click();
            MainBodyShowUsers.UI.unBindaDeleteUser();
            MainBodyShowUsers.UI.unBindaEditUser();
            MainBodyShowUsers.UI.unBindaChangePassword();
            MainBodyShowUsers.UI.unBindaPermissions();
        }
    }
}

namespace ModalNewUser {
    export class UI {

        static clearAll() {
            if ($("#inputModalCountNewUser").val() > 0) {
                // load data again
                MainBodyShowUsers.UI.loadNewData();
            }

            Site.Popover.remove("aAlertUserName");
            Site.Popover.remove("aAlertPassword");
            Site.Popover.remove("aAlertRepeatPassword");
            Site.Popover.remove("aAlertFirstName");
            Site.Popover.remove("aAlertLastName");

            $("#inputUserName").parent().removeClass("has-error");
            $("#inputPassword").parent().removeClass("has-error");
            $("#inputRepeatPassword").parent().removeClass("has-error");
            $("#inputFirstName").parent().removeClass("has-error");
            $("#inputLastName").parent().removeClass("has-error");

            $("#alertSuccess").velocity("fadeOut", {duration: 0});

            $("#inputUserName").val("");
            $("#inputPassword").val("");
            $("#inputRepeatPassword").val("");
            $("#inputFirstName").val("");
            $("#inputLastName").val("");

            $("#inputModalCountNewUser").val(0);
        }

        static bindAll() {
            $("#buttonSubmit").bind("click", ModalNewUser.UI.buttonSubmit_clicked);
            $("#divModalNewUser").on("hidden.bs.modal", ModalNewUser.UI.modal_closed);
        }

        static unBindAll() {
            $("#buttonSubmit").unbind("click");
            $("#divModalNewUser").unbind("hidden.bs.modal");
        }

        static modal_closed(e) {
            ModalNewUser.UI.clearAll();
            ModalNewUser.UI.unBindAll();
        }

        static buttonSubmit_clicked() {
            var clientSideError = 0;

            Site.Popover.remove("aAlertUserName");
            Site.Popover.remove("aAlertPassword");
            Site.Popover.remove("aAlertRepeatPassword");
            Site.Popover.remove("aAlertFirstName");
            Site.Popover.remove("aAlertLastName");

            $("#inputUserName").parent().removeClass("has-error");
            $("#inputPassword").parent().removeClass("has-error");
            $("#inputRepeatPassword").parent().removeClass("has-error");
            $("#inputFirstName").parent().removeClass("has-error");
            $("#inputLastName").parent().removeClass("has-error");

            $("#alertSuccess").velocity("fadeOut");

            var userName = $("#inputUserName").val();
            var password = $("#inputPassword").val();
            var repeatPassword = $("#inputRepeatPassword").val();
            var firstName = $("#inputFirstName").val();
            var lastName = $("#inputLastName").val();

            if (userName.length == 0) {
                Site.Popover.create("divAlerUserName1", "aAlertUserName", "spanAlertUserName");
                $("#inputUserName").parent().addClass("has-error");
                clientSideError += 1;
            }
            else {
                var regex1 = new RegExp("^[a-z]+[a-z0-9_.-]+$");
                var resultRegex1 = regex1.test(userName.trim().toLowerCase());

                if (!resultRegex1) {
                    Site.Popover.create("divAlerUserName2", "aAlertUserName", "spanAlertUserName");
                    $("#inputPassword").parent().addClass("has-error");
                    clientSideError += 1;
                }
            }

            if (password.length == 0) {
                Site.Popover.create("divAlerPassword1", "aAlertPassword", "spanAlertPassword");
                $("#inputPassword").parent().addClass("has-error");
                clientSideError += 1;
            }
            else {
                if (password.length < 8) {
                    Site.Popover.create("divAlerPassword2", "aAlertPassword", "spanAlertPassword");
                    $("#inputPassword").parent().addClass("has-error");
                    clientSideError += 1;
                }
            }

            if (repeatPassword.length === 0) {
                Site.Popover.create("divAlertRepeatPassword1", "aAlertRepeatPassword", "spanAlertRepeatPassword");
                $("#inputRepeatPassword").parent().addClass("has-error");
                clientSideError += 1;
            }
            else {
                if (password !== repeatPassword) {
                    Site.Popover.create("divAlertRepeatPassword2", "aAlertRepeatPassword", "spanAlertRepeatPassword");
                    $("#inputRepeatPassword").parent().addClass("has-error");
                    clientSideError += 1;
                }
            }

            if (firstName.length == 0) {
                Site.Popover.create("divAlertFirstName1", "aAlertFirstName", "spanAlertFirstName");
                $("#inputFirstName").parent().addClass("has-error");
                clientSideError += 1;
            }

            if (lastName.length == 0) {
                Site.Popover.create("divAlertLastName1", "aAlertLastName", "spanAlertLastName");
                $("#inputLastName").parent().addClass("has-error");
                clientSideError += 1;
            }

            if (clientSideError == 0) {
                var parameters = {
                    userName: userName,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                };


                $("#buttonSubmit").prop("disabled", true);
                $("#iButtonSubmitSpinner").css("opacity", 0.8);

                // send ajax

                $.ajax({
                    url: "./api/User/InsertUser",
                    method: "POST",
                    data: parameters,
                    success: function (data, textStatus, jqXHR) {
                        if (data.error == 6) {
                            Site.Popover.create("divAlerUserName3", "aAlertUserName", "spanAlertUserName");
                            $("#inputUserName").parent().addClass("has-error");
                        }
                        else if (data.error == 0) {
                            var msg: string = format("کاربر ثبت شد");
                            $("#alertSuccess").html(msg);
                            $("#alertSuccess").velocity("fadeIn");

                            $("#inputUserName").val("");
                            $("#inputPassword").val("");
                            $("#inputRepeatPassword").val("");
                            $("#inputFirstName").val("");
                            $("#inputLastName").val("");

                            var count = $("#inputModalCountNewUser").val();
                            $("#inputModalCountNewUser").val(count + 1);
                        }

                        $("#buttonSubmit").prop("disabled", false);
                        $("#iButtonSubmitSpinner").css("opacity", 0);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                })
            }
        }
    }
}

namespace ModalEditUser {
    export class UI {

        static loadDataBeforeEdit() {
            var data = JSON.parse($("#inputModalUserBeforeEdit").val());
            $("#inputEditFirstName").val(data.firstName);
            $("#inputEditLastName").val(data.lastName);
        }

        static clearAll() {
            if ($("#inputModalCountEditUser").val() > 0) {
                // load edited data
                var userId = JSON.parse($("#inputModalUserBeforeEdit").val()).userId;
                MainBodyShowUsers.UI.loadEditedData(userId);
            }

            Site.Popover.remove("aEditAlertFirstName");
            Site.Popover.remove("aEditAlertLastName");

            $("#inputEditFirstName").parent().removeClass("has-error");
            $("#inputEditLastName").parent().removeClass("has-error");

            $("#alertEditSuccess").velocity("fadeOut", {duration: 0});

            $("#inputEditFirstName").val("");
            $("#inputEditLastName").val("");

            $("#inputModalCountEditUser").val(0);
            $("#inputModalUserAfterEdit").val(null);
            $("#inputModalUserBeforeEdit").val(null);
        }

        static bindAll() {
            $("#buttonEditSubmit").bind("click", ModalEditUser.UI.buttonSubmit_clicked);
            $("#divModalEditUser").on("hidden.bs.modal", ModalEditUser.UI.modal_closed);
        }

        static unBindAll() {
            $("#buttonEditSubmit").unbind("click");
            $("#divModalEditUser").unbind("hidden.bs.modal");
        }

        static modal_closed(e) {
            ModalEditUser.UI.clearAll();
            ModalEditUser.UI.unBindAll();
        }

        static buttonSubmit_clicked() {
            var clientSideError = 0;

            Site.Popover.remove("aEditAlertFirstName");
            Site.Popover.remove("aEditAlertLastName");

            $("#inputEditFirstName").parent().removeClass("has-error");
            $("#inputEditLastName").parent().removeClass("has-error");

            $("#alertEditSuccess").velocity("fadeOut", {duration: 0});

            var firstName = $("#inputEditFirstName").val();
            var lastName = $("#inputEditLastName").val();


            if (firstName.length == 0) {
                Site.Popover.create("divEditAlertFirstName1", "aEditAlertFirstName", "spanEditAlertFirstName");
                $("#inputEditFirstName").parent().addClass("has-error");
                clientSideError += 1;
            }

            if (lastName.length == 0) {
                Site.Popover.create("divEditAlertLastName1", "aEditAlertLastName", "spanEditAlertLastName");
                $("#inputEditLastName").parent().addClass("has-error");
                clientSideError += 1;
            }

            if (clientSideError == 0) {

                var dataBeforeEdit = JSON.parse($("#inputModalUserBeforeEdit").val());

                var parameters = {
                    userId: dataBeforeEdit.userId,
                    firstName: firstName,
                    lastName: lastName
                };


                $("#buttonEditSubmit").prop("disabled", true);
                $("#iButtonEditSubmitSpinner").css("opacity", 0.8);

                // send ajax

                $.ajax({
                    url: "./api/User/EditUser",
                    method: "POST",
                    data: parameters,
                    success: function (data, textStatus, jqXHR) {
                        if (data.error == 0) {
                            var msg = format("ویرایش با موفقیت انجام شد");
                            $("#alertEditSuccess").html(msg);
                            $("#alertEditSuccess").velocity("fadeIn");

                            var count = $("#inputModalCountEditUser").val();
                            $("#inputModalCountEditUser").val(count + 1);
                            $("#inputModalUserAfterEdit").val(JSON.stringify(parameters));
                        }
                        else if (data.error === 5) {
                            var msg = format("ویرایش بدون تغییر انجام شد");
                            $("#alertEditSuccess").html(msg);
                            $("#alertEditSuccess").velocity("fadeIn");
                        }

                        $("#buttonEditSubmit").prop("disabled", false);
                        $("#iButtonEditSubmitSpinner").css("opacity", 0);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                })
            }
        }
    }
}

namespace ModalChangePassword {
    export class UI {

        static clearAll() {
            Site.Popover.remove("aCPAlertPassword");
            Site.Popover.remove("aCPAlertRepeatPassword");

            $("#inputCPPassword").parent().removeClass("has-error");
            $("#inputCPRepeatPassword").parent().removeClass("has-error");

            $("#alertCPSuccess").velocity("fadeOut", {duration: 0});

            $("#inputCPPassword").val("");
            $("#inputCPRepeatPassword").val("");

            ModalChangePassword.UI.clearDataBeforeEdit();
        }

        static bindAll() {
            $("#buttonCPSubmit").bind("click", ModalChangePassword.UI.buttonSubmit_clicked);
            $("#divModalChangePassword").on("hidden.bs.modal", ModalChangePassword.UI.modal_closed);
        }

        static unBindAll() {
            $("#buttonCPSubmit").unbind("click");
            $("#divModalChangePassword").unbind("hidden.bs.modal");
        }

        static modal_closed(e) {
            ModalChangePassword.UI.clearAll();
            ModalChangePassword.UI.unBindAll();
        }

        static setDataBeforeEdit(userId: string) {
            var data = {
                userId: userId
            };

            var dataStr = JSON.stringify(data);

            $("#inputModalCPDataBeforeEdit").val(dataStr);
        }

        static clearDataBeforeEdit() {
            $("#inputModalCPDataBeforeEdit").val("");
        }

        static getDataBeforeEdit() {
            var dataStr = $("#inputModalCPDataBeforeEdit").val();
            var data = JSON.parse(dataStr);

            return data;
        }

        static buttonSubmit_clicked() {
            var clientSideError = 0;

            Site.Popover.remove("aCPAlertPassword");
            Site.Popover.remove("aCPAlertRepeatPassword");

            $("#inputCPPassword").parent().removeClass("has-error");
            $("#inputCPRepeatPassword").parent().removeClass("has-error");

            $("#alertCPSuccess").velocity("fadeOut", {duration: 0});

            var password = $("#inputCPPassword").val();
            var repeatPassword = $("#inputCPRepeatPassword").val();

            if (password.length === 0) {
                Site.Popover.create("divCPAlerPassword1", "aCPAlertPassword", "spanCPAlertPassword");
                $("#inputCPPassword").parent().addClass("has-error");
                clientSideError += 1;
            }
            else {
                if (password.length < 8) {
                    Site.Popover.create("divCPAlerPassword2", "aCPAlertPassword", "spanCPAlertPassword");
                    $("#inputCPPassword").parent().addClass("has-error");
                    clientSideError += 1;
                }
            }

            if (repeatPassword.length === 0) {
                Site.Popover.create("divCPAlertRepeatPassword1", "aCPAlertRepeatPassword", "spanCPAlertRepeatPassword");
                $("#inputCPRepeatPassword").parent().addClass("has-error");
                clientSideError += 1;
            }
            else {
                if (password !== repeatPassword) {
                    Site.Popover.create("divCPAlertRepeatPassword2", "aCPAlertRepeatPassword", "spanCPAlertRepeatPassword");
                    $("#inputCPRepeatPassword").parent().addClass("has-error");
                    clientSideError += 1;
                }
            }

            var dataBeforeEdit = ModalChangePassword.UI.getDataBeforeEdit();
            var userId = dataBeforeEdit.userId;

            if (clientSideError == 0) {
                var parameters = {
                    userId: userId,
                    password: password
                };

                $("#buttonCPSubmit").prop("disabled", true);
                $("#iButtonCPSubmitSpinner").css("opacity", 0.8);

                // send ajax

                $.ajax({
                    url: "./api/User/ChangePassword",
                    method: "POST",
                    data: parameters,
                    success: function (data, textStatus, jqXHR) {
                        if (data.error == 0) {
                            var msg = format("تغییر کلمه عبور انجام شد");
                            $("#alertCPSuccess").html(msg);
                            $("#alertCPSuccess").velocity("fadeIn");

                            $("#inputCPPassword").val("");
                            $("#inputCPRepeatPassword").val("");
                        } else if (data.error === 4) {
                            var msg = format("ویرایش بدون تغییر انجام شد");
                            $("#alertCPSuccess").html(msg);
                            $("#alertCPSuccess").velocity("fadeIn");
                        }

                        $("#buttonCPSubmit").prop("disabled", false);
                        $("#iButtonCPSubmitSpinner").css("opacity", 0);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                })
            }
        }
    }
}

namespace ModalPermissions {
    export class UI {

        static clearAll() {
            ModalPermissions.UI.clearDataBeforeEdit();
            ModalPermissions.UI.clearIdleUser();
            ModalPermissions.UI.clearDataPermissionsList();
            ModalPermissions.UI.clearUlListPermissions();
        }

        static clearUlListPermissions() {
            $("#ulListPermissions").empty();
        }

        static fetchData(filter = null) {
            // show loader
            var element = $("#ulListPermissions").parent();
            Site.UI.showLoaderForContent(element, 25, 42);
            //

            var parameters = {query: filter};

            $.ajax({
                url: "./hbs/modalPermissionsList.hbs",
                method: "GET",
                success: function (data, textStatus, jqXHR) {
                    var template = Handlebars.compile(data);
                    var userId = ModalPermissions.UI.getDataBeforeEdit().userId;
                    var param2 = {
                        userId: userId
                    };

                    $.ajax({
                        url: "./api/User/GetPermissions",
                        data: param2,
                        method: "POST",
                        success: function (data2, textStatus2, jqXHR2) {
                            $("#ulListPermissions").empty();

                            $.ajax({
                                method: "POST",
                                url: "./api/Permissions/GetPermissionsList",
                                data: parameters,
                                success: function (data3, textStatus3, jqXHR3) {

                                    var data3Result = data3.result;

                                    // save for later use in search
                                    ModalPermissions.UI.setDataPermissionsList(data3Result);

                                    var length = data3Result.length;
                                    $(data3Result).each(function (index, elem) {

                                        var checkBoxId = format("chkPermission{0}", data3Result[index].permissionNumber);
                                        var permissionNumber = data3Result[index].permissionNumber;

                                        var context = {
                                            permissionNumber: permissionNumber,
                                            permissionName: data3Result[index].permissionFaName,
                                            id: checkBoxId,
                                        };

                                        var html = template(context);

                                        $("#ulListPermissions").append(html);
                                    });

                                    $("#ulListPermissions").find("li:first").addClass("borderlessTop");
                                    $("#ulListPermissions").find("li:last").addClass("borderlessBottom");

                                    // check previous user permissions
                                    if (data2.error === 0) {
                                        var inputs = $("#ulListPermissions").find("input");

                                        $(inputs).each((index, elem)=> {
                                            var permNumber = $(elem).val();

                                            $(data2.result).each((index3, elem3)=> {
                                                if (data2.result[index3].permissionNumber === parseInt(permNumber)) {
                                                    $(inputs[index]).prop("checked", true);
                                                }
                                            });
                                        });
                                    }

                                    //

                                    ModalPermissions.UI.bindCheckboxesForPermission();
                                    Site.UI.hideLoaderForContent();
                                }
                            });
                        }
                    });
                }
            });

        }

        static setDataPermissionsList(data) {
            $("#inputModalPePermissionsList").val(JSON.stringify(data));
        }

        static getDataPermissionsList() {
            var data = JSON.parse($("#inputModalPePermissionsList").val());
            return data;
        }

        static clearDataPermissionsList() {
            ModalPermissions.UI.setDataPermissionsList("");
        }

        static bindCheckboxesForPermission() {
            var inputs = $("#ulListPermissions").find("input");

            $(inputs).each((index, elem)=> {
                $(elem).change(function () {
                    var value1 = $("#inputModalPeIdleUser").val();
                    $("#inputModalPeIdleUser").val(parseInt(value1) + 1);
                });
            });
        }

        static bindAll() {
            $("#divModalPermissions").on("hidden.bs.modal", ModalPermissions.UI.modal_closed);
            ModalPermissions.UI.bindSearchBox();
        }

        static bindSearchBox() {
            $("#inputSearchPermissions").bind("keyup", function (e) {
                var permissions = ModalPermissions.UI.getDataPermissionsList();
                var searchStr = $("#inputSearchPermissions").val();

                $(permissions).each((index, elem)=> {
                    var permissionFaName = permissions[index].permissionFaName;
                    var permissionNumber = permissions[index].permissionNumber;
                    var element = $("#ulListPermissions").find(format("li[data-nm-permission-number='{0}']", permissionNumber));

                    if (permissionFaName.search(searchStr) === -1) {
                        $(element).velocity({opacity: 0}, {
                            duration: 100, complete: function (elements) {
                                $(element).addClass("nm-notMatched");
                            }
                        });
                    }
                    else {
                        $(element).velocity({opacity: 1}, {
                            duration: 100, complete: function (elements) {
                                $(element).removeClass("nm-notMatched");
                            }
                        });
                    }
                });
            });
        }

        static unBindSearchBox() {
            $("#inputSearchPermissions").unbind("keyup");
        }

        static unBindAll() {
            $("#divModalPermissions").unbind("hidden.bs.modal");
            ModalPermissions.UI.unBindSearchBox();
        }

        static savePermissions() {
            var counter = parseInt($("#inputModalPeIdleUser").val());

            if (counter === 0) {
                return;
            }

            MainBodyShowUsers.UI.showLoading();
            var inputs = $("#ulListPermissions").find("input");
            var permissions = [];

            $(inputs).each((index, elem)=> {
                var permissionNumber = $(elem).val();

                if ($(elem).prop("checked")) {
                    permissions.push(permissionNumber);
                }
            });

            var userId = ModalPermissions.UI.getDataBeforeEdit().userId;

            var parameters = {
                userId: userId,
                permissions: JSON.stringify(permissions),
            };

            $.ajax({
                url: "./api/User/SetPermissions",
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    MainBodyShowUsers.UI.hideLoading();
                }
            })
        }

        static modal_closed(e) {
            ModalPermissions.UI.savePermissions();
            ModalPermissions.UI.clearAll();
            ModalPermissions.UI.unBindAll();
        }

        static setDataBeforeEdit(userId: string) {
            var data = {
                userId: userId
            };

            var dataStr = JSON.stringify(data);

            $("#inputModalPeDataBeforeEdit").val(dataStr);
        }

        static clearIdleUser() {
            $("#inputModalPeIdleUser").val(0);
        }

        static clearDataBeforeEdit() {
            $("#inputModalPeDataBeforeEdit").val("");
        }

        static getDataBeforeEdit() {
            var dataStr = $("#inputModalPeDataBeforeEdit").val();
            var data = JSON.parse(dataStr);

            return data;
        }
    }
}