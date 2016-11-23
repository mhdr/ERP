window['format'];
var format;
$(document).ready(function () {
    NM.UI.centerVertically();
    Login.bindButtonLogin();
    Login.bindKeyPress();
    Login.bindWindowOnResize();
    document.getElementById("inputUserName").focus();
});
var Login = (function () {
    function Login() {
    }
    Login.bindKeyPress = function () {
        $(document).keypress(function (e) {
            if (e.keyCode == 13)
                $('#buttonLogin').click();
        });
    };
    Login.bindWindowOnResize = function () {
        $(window).resize(function () {
            NM.UI.centerVertically();
        });
    };
    Login.bindButtonLogin = function () {
        $("#buttonLogin").bind("click", function () {
            var alert = $("#spanLoginMesaage");
            $(alert).velocity("fadeOut", { duration: 100 });
            var userName = $("#inputUserName").val();
            var password = $("#inputPassword").val();
            var rememberMe = $("#inputRememberMe").prop("checked");
            if (userName.length === 0 || password.length === 0) {
                var msg = format("نام کاربری/کلمه عبور خالی است");
                $(alert).html(msg);
                $(alert).velocity("fadeIn", { duration: 800 });
                return;
            }
            var parameters = {
                userName: userName,
                password: password,
                rememberMe: JSON.stringify(rememberMe)
            };
            var url = "./api/Login";
            $.ajax({
                url: url,
                method: "POST",
                data: parameters,
                success: function (data, textStatus, jqXHR) {
                    if (data.error === 0) {
                        window.location.href = data.redirect;
                    }
                    else {
                        if (data.error === 4 || data.error === 5) {
                            var msg = format("نام کاربری/کلمه عبور صحیح نمی باشد");
                            $(alert).html(msg);
                            $(alert).velocity("fadeIn", { duration: 800 });
                        }
                        else {
                            var msg = format("خطا در سرور");
                            $(alert).html(msg);
                            $(alert).velocity("fadeIn", { duration: 800 });
                        }
                    }
                }
            });
        });
    };
    return Login;
}());
//# sourceMappingURL=login.js.map