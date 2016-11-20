package com.nasimeshomal.controller;

import com.nasimeshomal.lib.GenerateData;
import com.nasimeshomal.lib.SessionManager;
import com.nasimeshomal.lib.Statics;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import org.springframework.ui.Model;

@Controller
public class DefaultController {

    @RequestMapping("/")
    public String index(HttpServletRequest request, HttpServletResponse response,Model model) {

        SessionManager sessionManager = new SessionManager(request,response);

        if (!sessionManager.isUserLoggedIn()) {

            model.addAttribute("version",Statics.getVersion());
        }

        model.addAttribute("version",Statics.getVersion());
        return "index";
    }

    @RequestMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response,Model model) {

        SessionManager sessionManager = new SessionManager(request,response);

        model.addAttribute("version",Statics.getVersion());
        return "login";
    }

    @RequestMapping("/SignOut")
    public String logout(HttpServletRequest request, HttpServletResponse response,Model model) {
        SessionManager sessionManager = new SessionManager(request,response);

        if (sessionManager.isUserLoggedIn())
        {
            sessionManager.logout();
        }

        return "redirect:login";
    }

    @RequestMapping("/gen")
    public String generate(HttpServletRequest request, HttpServletResponse response) {


        GenerateData generateData=new GenerateData();

        return "gen";
    }
}
