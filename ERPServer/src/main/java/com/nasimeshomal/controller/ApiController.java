package com.nasimeshomal.controller;

import com.nasimeshomal.bl.MachineryBL;
import com.nasimeshomal.bl.PermissionBL;
import com.nasimeshomal.bl.StaticsBL;
import com.nasimeshomal.bl.UsersBL;
import com.nasimeshomal.lib.IP;
import com.nasimeshomal.lib.SessionManager;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ApiController {

    @RequestMapping(value = "/api/User/GetUsers", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUsers(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }
        UsersBL users = new UsersBL(request, response);
        result = users.getUsers();
        return result;
    }

    @RequestMapping(value = "/api/User/GetUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        UsersBL users = new UsersBL(request, response);

        result = users.getCurrentUser();
        return result;
    }

    @RequestMapping(value = "/api/User/EditUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map editUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }
        UsersBL users = new UsersBL(request, response);

        result = users.editUser();
        return result;
    }

    @RequestMapping(value = "/api/User/GetLastLogin", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getLastLogin(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        UsersBL users = new UsersBL(request, response);
        result = users.getLastLogin();
        return result;
    }

    @RequestMapping(value = "/api/User/GetUserIP", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getUserIP(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        IP ip = new IP(request, response);
        result = ip.getIP2();

        return result;
    }

    @RequestMapping(value = "/api/Permissions/GetPermissionsList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getPermissionsList(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        PermissionBL permissions = new PermissionBL(request, response);
        result = permissions.getPermissionList();
        return result;
    }

    @RequestMapping(value = "/api/User/GetPermissions", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getPermissions(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        UsersBL users = new UsersBL(request, response);
        result = users.getPermissions();
        return result;
    }

    private Map authenticationError(HttpServletRequest request, HttpServletResponse response) {
        String host = String.format("%s://%s", request.getScheme(), request.getHeader("host"));
        Map<String, Object> result = new HashMap();

        result.put("error", -1);
        result.put("redirect", host);

        return result;
    }

    @RequestMapping(value = "/api/Login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map login(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        UsersBL users = new UsersBL(request, response);
        Map result = users.login();

        int errorNumber = (int) result.get("error");

        String host = String.format("%s://%s", request.getScheme(), request.getHeader("host"));

        if (errorNumber == 0) {
            sessionManager.login(result.get("userName").toString());
            sessionManager.checkRemeberMe(request.getParameterMap());
            result.put("redirect", host);
        }

        return result;
    }

    @RequestMapping(value = "/api/User/SetPermissions", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map setPermissions(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        UsersBL users = new UsersBL(request, response);
        result = users.setPermissions();
        return result;
    }

    @RequestMapping(value = "/api/User/DeleteUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map deleteUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        UsersBL users = new UsersBL(request, response);
        result = users.deleteUser();
        return result;
    }

    @RequestMapping(value = "/api/User/ChangePassword", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map changePassword(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        UsersBL users = new UsersBL(request, response);
        result = users.changePassowrd();
        return result;
    }

    @RequestMapping(value = "/api/User/InsertUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map insertUser(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        UsersBL users = new UsersBL(request, response);
        result = users.insertNewUser();
        return result;
    }

    @RequestMapping(value = "/api/GetVersion", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getVersion(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        StaticsBL statics = new StaticsBL();
        result = statics.getVersion();
        return result;
    }

    @RequestMapping(value = "/api/Machinery/GetMachinery", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map getMachinery(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        MachineryBL machineryBL = new MachineryBL(request, response);
        result = machineryBL.getMachinery();

        return result;
    }

    @RequestMapping(value = "/api/Machinery/InsertUnit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map insertUnit(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result = null;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        MachineryBL machineryBL=new MachineryBL(request,response);
        result= machineryBL.insertUnit();

        return result;
    }

    @RequestMapping(value = "/api/Machinery/DeleteMachinery", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map deleteMachinery(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result = null;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        MachineryBL machineryBL=new MachineryBL(request,response);
        result= machineryBL.deleteMachinery();

        return result;
    }

    @RequestMapping(value = "/api/Machinery/InsertMachine", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map insertMachine(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result = null;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        MachineryBL machineryBL=new MachineryBL(request,response);
        result= machineryBL.insertMachine();

        return result;
    }

    @RequestMapping(value = "/api/Machinery/InsertFolder", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map insertFolder(HttpServletRequest request, HttpServletResponse response) {
        SessionManager sessionManager = new SessionManager(request, response);

        Map result = null;

        if (!sessionManager.isUserLoggedIn()) {
            result = authenticationError(request, response);
            return result;
        }

        MachineryBL machineryBL=new MachineryBL(request,response);
        result= machineryBL.insertFolder();

        return result;
    }
}
