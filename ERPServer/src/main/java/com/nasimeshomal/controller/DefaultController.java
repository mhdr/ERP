package com.nasimeshomal.controller;

import com.nasimeshomal.lib.SessionManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class DefaultController {

    @RequestMapping("/")
    public String index(HttpServletRequest request, HttpServletResponse response) {

        SessionManager sessionManager = new SessionManager(request,response);

        if (!sessionManager.isUserLoggedIn()) {
            return "redirect:login";
        }

        return "index";
    }

    @RequestMapping("/login")
    public String login(HttpServletRequest request, HttpServletResponse response) {

        SessionManager sessionManager = new SessionManager(request,response);

        return "login";
    }

    @RequestMapping("logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        if (sessionManager.isUserLoggedIn())
        {
            sessionManager.logout();
        }

        return "redirect:login";
    }
}
