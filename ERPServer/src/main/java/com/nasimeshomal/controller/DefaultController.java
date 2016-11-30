package com.nasimeshomal.controller;

import com.nasimeshomal.bl.UsersBL;
import com.nasimeshomal.lib.GenerateData;
import com.nasimeshomal.lib.SessionManager;
import com.nasimeshomal.lib.Statics;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;

import org.springframework.web.servlet.ModelAndView;

@Controller
public class DefaultController {

    @RequestMapping("/")
    public ModelAndView index(HttpServletRequest request, HttpServletResponse response) {

        SessionManager sessionManager = new SessionManager(request,response);

        if (!sessionManager.isUserLoggedIn()) {

            ModelAndView modelAndView=new ModelAndView("redirect:login");
            return modelAndView;
        }


        UsersBL users=new UsersBL(request,response);
        ArrayList<Integer> permissions=users.getPermissionsList();

        ModelAndView modelAndView=new ModelAndView("index");
        modelAndView.addObject("version",Statics.getVersion());
        modelAndView.addObject("permissions",permissions);
        return modelAndView;
    }

    @RequestMapping("/login")
    public ModelAndView login(HttpServletRequest request, HttpServletResponse response) {

        SessionManager sessionManager = new SessionManager(request,response);

        ModelAndView modelAndView=new ModelAndView("login");
        modelAndView.addObject("version",Statics.getVersion());
        return modelAndView;
    }

    @RequestMapping("/SignOut")
    public ModelAndView logout(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        if (sessionManager.isUserLoggedIn())
        {
            sessionManager.logout();
        }

        ModelAndView modelAndView=new ModelAndView("redirect:login");
        return modelAndView;
    }

    @RequestMapping("/gen")
    public ModelAndView generate(HttpServletRequest request, HttpServletResponse response) {


        GenerateData generateData=new GenerateData();

        ModelAndView modelAndView=new ModelAndView("gen");
        return modelAndView;
    }
}
