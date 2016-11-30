//<reference path="../../../../DefinitelyTyped/jquery/jquery.d.ts"/>
///<reference path="../../../../DefinitelyTyped/velocity-animate/velocity-animate.d.ts"/>
///<reference path="../../../../DefinitelyTyped/bootstrap/bootstrap.d.ts"/>
///<reference path="../../../../DefinitelyTyped/knockout/knockout.d.ts"/>
///<reference path="../nm.d.ts"/>
///<reference path="../common.d.ts"/>

namespace MainBodyAdminMachinery{
    export class UI{
        static load(complete:Function)
        {
            let parameters={parentId:""};
            $.ajax({
                url:"./api/Machinery/GetMachinery",
                method:"POST",
                data:parameters,
                success:function (data, textStatus, jqXHR) {

                    if (data.error===0)
                    {
                        console.log(data);
                    }

                    $("#divMainBodyAdminMachinery").velocity("fadeIn",{duration:250});
                    complete();
                }
            });
        }

        static bindAll()
        {

        }

        static unBindAll()
        {

        }
    }
}