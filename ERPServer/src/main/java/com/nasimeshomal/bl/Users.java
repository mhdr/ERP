package com.nasimeshomal.bl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.mongodb.WriteResult;
import com.nasimeshomal.config.ApplicationConfig;
import com.nasimeshomal.lib.Hash;
import com.nasimeshomal.lib.IP;
import com.nasimeshomal.lib.SessionManager;
import com.nasimeshomal.model.LoginHistory;
import com.nasimeshomal.model.User;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.concurrent.Executors;

public class Users {

    MongoOperations mongoOperations;
    HttpServletRequest request;
    HttpServletResponse response;

    public Users(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;

        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(ApplicationConfig.class);
        this.mongoOperations = (MongoOperations) ctx.getBean("mongoTemplate");
    }

    public Map<String, Object> getUsers() {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
            List<User> users = mongoOperations.findAll(User.class);
            ArrayList<Map<String, String>> usersMap = new ArrayList<Map<String, String>>();

            for (User user : users) {
                // remove admin
                if (Objects.equals(user.userName, "admin")) {
                    continue;
                }

                Map<String, String> mUser = new HashMap<String, String>();

                mUser.put("id", user.id);
                mUser.put("userName", user.userName);
                mUser.put("firstName", user.firstName);
                mUser.put("lastName", user.lastName);

                usersMap.add(mUser);
            }

            result.put("users", usersMap);
            result.put("error", 0);
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> login() {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
            Map<String, String[]> data = request.getParameterMap();
            String userName = data.get("userName")[0];
            String password = data.get("password")[0];

            if (StringUtils.isBlank(userName)) {
                // userName is empty
                result.put("error", 2);
                return result;
            }

            if (StringUtils.isBlank(password)) {
                // password is empty
                result.put("error", 3);
                return result;
            }

            Query query = new Query();
            query.addCriteria(Criteria.where("userName").is(userName));
            User user = mongoOperations.findOne(query, User.class);

            if (user == null) {
                // invalid userName
                result.put("error", 4);
                return result;
            }

            if (Objects.equals(user.password, Hash.getSHA512(password))) {

                // log current login
                Executors.newCachedThreadPool().execute(new Runnable() {
                    @Override
                    public void run() {

                        IP ip = new IP(request, response);
                        String userIP = ip.getIP();

                        String userId = user.id;
                        String now = DateTime.now().toString();
                        String sessionId = request.getSession().getId();

                        LoginHistory loginHistory = new LoginHistory(userId, userIP, sessionId, now);

                        mongoOperations.save(loginHistory);
                    }
                });

                // no error , userName and password match
                result.put("userName", userName);
                result.put("error", 0);
            } else {
                // currentUser and password don't match
                result.put("error", 5);
            }

        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> insertNewUser() {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
            Map<String, String[]> data = this.request.getParameterMap();
            String userName = data.get("userName")[0];
            String firstName = data.get("firstName")[0];
            String lastName = data.get("lastName")[0];
            String password = data.get("password")[0];
            String repeatPassword = data.get("repeatPassword")[0];

            if (StringUtils.isBlank(userName)) {
                // empty userName
                result.put("error", 2);
                return result;
            }

            if (StringUtils.isBlank(firstName)) {
                // empty firstName
                result.put("error", 3);
                return result;
            }

            if (StringUtils.isBlank(lastName)) {
                // empty lastName
                result.put("error", 4);
                return result;
            }

            if (StringUtils.isBlank(password)) {
                // empty lastName
                result.put("error", 5);
                return result;
            }

            if (StringUtils.isBlank(repeatPassword)) {
                // empty lastName
                result.put("error", 6);
                return result;
            }

            if (!Objects.equals(password, repeatPassword)) {
                // psswords mismatch
                result.put("error", 7);
                return result;
            }

            Query query = new Query();
            query.addCriteria(Criteria.where("userName").is(userName));
            User currentUser = mongoOperations.findOne(query, User.class);

            if (currentUser != null) {
                // userName is in use
                result.put("error", 8);
                return result;
            }

            User user = new User();
            user.userName = userName;
            user.firstName = firstName;
            user.lastName = lastName;
            user.password = Hash.getSHA512(password);
            user.dateCreated = DateTime.now().toString();

            mongoOperations.save(user);

            result.put("id", user.id.toString());
            result.put("error", 0);
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> getCurrentUser() {
        Map<String, Object> result = new HashMap<>();


        try {
            SessionManager sessionManager = new SessionManager(this.request, this.response);
            User user = sessionManager.getCurrentUser();

            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.id);
            userMap.put("userName", user.userName);
            userMap.put("firstName", user.firstName);
            userMap.put("lastName", user.lastName);
            userMap.put("dateCreated", user.dateCreated);

            result.put("error", 0);
            result.put("user", userMap);
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }


        return result;
    }

    public Map<String, Object> getLastLogin() {
        Map<String, Object> result = new HashMap<>();

        try {
            SessionManager sessionManager = new SessionManager(this.request, this.response);
            String userId = sessionManager.getCurrentUser().id;

            Query query = new Query();
            query.addCriteria(Criteria.where("userId").is(userId));
            query.limit(3);
            Sort sort = new Sort(Sort.Direction.DESC, "id");
            query.with(sort);

            List<LoginHistory> history = mongoOperations.find(query, LoginHistory.class);

            for (LoginHistory h : history) {
                if (!Objects.equals(request.getSession().getId(), h.sessionId)) {
                    result.put("error", 0);
                    result.put("ip", h.ip);
                    result.put("loginDate", h.loginDate);
                    return result;
                }
            }

            // if no last login found
            result.put("error", 0);
            result.put("ip", "");
            result.put("loginDate", "");
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String,Object> getPermissions()
    {
        Map<String,Object> result=new HashMap<>();

        try {
            Map<String, String[]> data = this.request.getParameterMap();
            String userId="";

            if (data.containsKey("userId"))
            {
                userId = data.get("userId")[0];
            }
            else{
                SessionManager sessionManager=new SessionManager(request,response);
                userId=sessionManager.getCurrentUser().id;
            }


            User user=mongoOperations.findById(new ObjectId(userId),User.class);

            result.put("error",0);
            result.put("result",user.permissions);
        }
        catch (Exception ex)
        {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String,Object> setPermissions()
    {
        Map<String,Object> result=new HashMap<>();

        try {
            Map<String, String[]> data = this.request.getParameterMap();
            String userId = data.get("userId")[0];

            String permissionStr=data.get("permissions")[0];

            Gson gson=new Gson();
            ArrayList<String> permissions=gson.fromJson(permissionStr,ArrayList.class);


            User user=mongoOperations.findById(new ObjectId(userId),User.class);

            user.clearPermission();

            for (String num:permissions)
            {
                user.addPermission(Integer.parseInt(num));
            }

            mongoOperations.save(user);

            result.put("error",0);
        }
        catch (Exception ex)
        {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> editUser() {
        Map<String, Object> result = new HashMap<>();

        try {
            SessionManager sessionManager = new SessionManager(this.request, this.response);
            Map<String, String[]> data = this.request.getParameterMap();

            // get current logged in user id
            String userId = sessionManager.getCurrentUser().id;

            if (StringUtils.isBlank(userId)) {
                // if userId is not present in session get it from request
                userId = data.get("userId")[0];
            }


            String firstName= data.get("firstName")[0];
            String lastName= data.get("lastName")[0];

            if (StringUtils.isBlank(userId))
            {
                result.put("error", 2);
                return result;
            }

            if (StringUtils.isBlank(firstName))
            {
                result.put("error", 3);
                return result;
            }

            if (StringUtils.isBlank(lastName))
            {
                result.put("error", 4);
                return result;
            }

            Query query=new Query();
            query.addCriteria(Criteria.where("id").is(userId));

            Update update=new Update();
            update.set("firstName",firstName);
            update.set("lastName",lastName);
            WriteResult writeResult= mongoOperations.updateFirst(query,update,User.class);

            int numerOfRowAffected=writeResult.getN();

            if (numerOfRowAffected>0)
            {
                result.put("error", 0);
            }
            else {
                // no modification
                result.put("error", 5);
            }

        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }
}
