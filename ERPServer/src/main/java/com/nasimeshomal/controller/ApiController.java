package com.nasimeshomal.controller;

import com.nasimeshomal.lib.SessionManager;
import com.nasimeshomal.lib.Users;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.Map;

@RestController
public class ApiController {

    @RequestMapping(value = "/api/getUsers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUsers(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        Users users = new Users();
        Map result = users.getUsers();
        return result;
    }

    @RequestMapping(value = "/api/User/GetPermissions", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getPermissions(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);


        //todo next
        Users users = new Users();
        Map result = users.getUsers();
        return result;
    }

    @RequestMapping(value = "/api/Login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map login(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        Map data = request.getParameterMap();
        Users users = new Users();
        Map result = users.login(data);

        int errorNumber= (int) result.get("error");

        String host=String.format("%s://%s",request.getScheme(),request.getHeader("host"));
        Enumeration<String> headers=request.getHeaderNames();

        if (errorNumber==0)
        {
            sessionManager.login(result.get("userName").toString());
            sessionManager.checkRemeberMe(data);
            result.put("redirect",host);
        }

        return result;
    }
}
