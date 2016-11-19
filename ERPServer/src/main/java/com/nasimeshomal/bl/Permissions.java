package com.nasimeshomal.bl;

import com.nasimeshomal.config.MongoConfig;
import com.nasimeshomal.model.Permission;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

public class Permissions {
    MongoOperations mongoOperations;
    HttpServletRequest request;
    HttpServletResponse response;

    public Permissions(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;

        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        this.mongoOperations = (MongoOperations) ctx.getBean("mongoTemplate");
    }

    public Map<String, Object> getPermissionList() {
        Map<String, Object> result = new HashMap<>();


        try {
            List<Permission> permissionList = mongoOperations.findAll(Permission.class);

            ArrayList<Map<String,Object>> permissions=new ArrayList<>();

            for (Permission permission:permissionList)
            {
                Map<String,Object> p=new HashMap<>();
                p.put("permissionNumber",permission.permissionNumber);
                p.put("permissionFaName",permission.permissionFaName);
                permissions.add(p);
            }

            result.put("error",0);
            result.put("result",permissions);

        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }


        return result;
    }
}
