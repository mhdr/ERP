///<reference path="../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../DefinitelyTyped/handlebars/handlebars.d.ts"/>
///<reference path="../../javascripts/site/nm.d.ts"/>

window['format'];
var format: any;

$(document).ready(()=> {

    NM.UI.centerVertically();

    Login.bindButtonLogin();
    Login.bindKeyPress();
    Login.bindWindowOnResize();
});

class Login {

    static bindKeyPress()
    {
        $(document).keypress(function(e){
            if(e.keyCode==13)
                $('#buttonLogin').click();
        });
    }

    static bindWindowOnResize()
    {
        $(window).resize(()=>{
            NM.UI.centerVertically();
        });
    }

    static bindButtonLogin() {
        $("#buttonLogin").bind("click", ()=> {

            var alert = $("#spanLoginMesaage");

            $(alert).velocity("fadeOut",{duration:100});

            var userName = $("#inputUserName").val();
            var password = $("#inputPassword").val();
            var rememberMe = $("#inputRememberMe").prop("checked");

            if (userName.length===0 || password.length===0)
            {
                var msg = format("نام کاربری/کلمه عبور خالی است");
                $(alert).html(msg);
                $(alert).velocity("fadeIn", {duration: 800});
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

                        if (data.error === 2) {
                            var msg = format("نام کاربری/کلمه عبور صحیح نمی باشد");
                            $(alert).html(msg);
                            $(alert).velocity("fadeIn", {duration: 800});
                        }
                        else {
                            var msg = format("خطا در سرور");
                            $(alert).html(msg);
                            $(alert).velocity("fadeIn", {duration: 800});
                        }
                    }
                }
            })
        });
    }
}