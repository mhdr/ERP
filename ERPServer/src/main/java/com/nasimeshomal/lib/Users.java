package com.nasimeshomal.lib;

import com.nasimeshomal.config.ApplicationConfig;
import com.nasimeshomal.model.User;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Users {

    MongoOperations mongoOperations;

    public Users() {
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

    public Map<String, Object> login(Map<String, String[]> data) {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
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
                // no error , userName and password match
                result.put("userName", userName);
                result.put("error", 0);
            } else {
                // user and password don't match
                result.put("error", 5);
            }

        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> insertNewUser(Map<String, String> data) {
        Map<String, Object> result = new HashMap<String, Object>();

        try {
            String userName = data.get("userName");
            String firstName = data.get("firstName");
            String lastName = data.get("lastName");
            String password = data.get("password");
            String repeatPassword = data.get("repeatPassword");

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
}
