package com.nasimeshomal.controller;

import com.nasimeshomal.lib.IP;
import com.nasimeshomal.lib.SessionManager;
import com.nasimeshomal.bl.Users;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.Map;

@RestController
public class ApiController {

    @RequestMapping(value = "/api/User/GetUsers", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUsers(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        Users users = new Users(request,response);
        Map result = users.getUsers();
        return result;
    }

    @RequestMapping(value = "/api/User/GetUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        Users users=new Users(request,response);

        Map result = users.getCurrentUser();
        return result;
    }

    @RequestMapping(value = "/api/User/EditUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map editUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        Users users=new Users(request,response);

        Map result = users.editUser();
        return result;
    }

    @RequestMapping(value = "api/User/GetLastLogin", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getLastLogin(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        Users users=new Users(request,response);
        Map result =users.getLastLogin();
        return result;
    }

    @RequestMapping(value = "/api/User/GetUserIP", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUserIP(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        IP ip=new IP(request,response);
        Map result=ip.getIP2();

        return result;
    }

    @RequestMapping(value = "api/Permissions/GetPermissionsList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getPermissionsList(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);


        //todo next
        Users users = new Users(request,response);
        Map result = users.getUsers();
        return result;
    }

    @RequestMapping(value = "/api/User/GetPermissions", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getPermissions(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);


        //todo next
        Users users = new Users(request,response);
        Map result = users.getUsers();
        return result;
    }

    @RequestMapping(value = "/api/Login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map login(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request,response);

        Users users = new Users(request,response);
        Map result = users.login();

        int errorNumber= (int) result.get("error");

        String host=String.format("%s://%s",request.getScheme(),request.getHeader("host"));
        Enumeration<String> headers=request.getHeaderNames();

        if (errorNumber==0)
        {
            sessionManager.login(result.get("userName").toString());
            sessionManager.checkRemeberMe(request.getParameterMap());
            result.put("redirect",host);
        }

        return result;
    }
}
