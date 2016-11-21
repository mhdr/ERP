package com.nasimeshomal.controller;

import com.nasimeshomal.bl.Permissions;
import com.nasimeshomal.bl.Statics;
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
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.getUsers();
        return result;
    }

    @RequestMapping(value = "/api/User/GetUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);

        Map result = users.getCurrentUser();
        return result;
    }

    @RequestMapping(value = "/api/User/EditUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map editUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);

        Map result = users.editUser();
        return result;
    }

    @RequestMapping(value = "api/User/GetLastLogin", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getLastLogin(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.getLastLogin();
        return result;
    }

    @RequestMapping(value = "/api/User/GetUserIP", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUserIP(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        IP ip = new IP(request, response);
        Map result = ip.getIP2();

        return result;
    }

    @RequestMapping(value = "api/Permissions/GetPermissionsList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getPermissionsList(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Permissions permissions = new Permissions(request, response);
        Map result = permissions.getPermissionList();
        return result;
    }

    @RequestMapping(value = "/api/User/GetPermissions", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getPermissions(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.getPermissions();
        return result;
    }

    @RequestMapping(value = "/api/Login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map login(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.login();

        int errorNumber = (int) result.get("error");

        String host = String.format("%s://%s", request.getScheme(), request.getHeader("host"));
        Enumeration<String> headers = request.getHeaderNames();

        if (errorNumber == 0) {
            sessionManager.login(result.get("userName").toString());
            sessionManager.checkRemeberMe(request.getParameterMap());
            result.put("redirect", host);
        }

        return result;
    }

    @RequestMapping(value = "api/User/SetPermissions", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map setPermissions(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.setPermissions();
        return result;
    }

    @RequestMapping(value = "api/User/DeleteUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map deleteUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.deleteUser();
        return result;
    }

    @RequestMapping(value = "api/User/ChangePassword", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map changePassword(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.changePassowrd();
        return result;
    }

    @RequestMapping(value = "api/User/InsertUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map insertUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Users users = new Users(request, response);
        Map result = users.insertNewUser();
        return result;
    }

    @RequestMapping(value = "api/GetVersion", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getVersion(HttpServletRequest request, HttpServletResponse response)
    {
        SessionManager sessionManager = new SessionManager(request, response);

        Statics statics=new Statics();
        Map result= statics.getVersion();
        return result;
    }
}
