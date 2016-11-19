package com.nasimeshomal.lib;

import com.nasimeshomal.config.MongoConfig;
import com.nasimeshomal.model.LoginHistory;
import com.nasimeshomal.model.Permission;
import com.nasimeshomal.model.User;
import org.joda.time.DateTime;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;

public class GenerateData {

    public GenerateData()
    {
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        MongoOperations mongoOperations = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperations.dropCollection(Permission.class);

        Permission permission1=new Permission();
        permission1.permissionNumber=1;
        permission1.permissionName="UserManagement";
        permission1.permissionFaName="مدیریت کاربران";
        permission1.order=1;

        Permission permission2=new Permission();
        permission2.permissionNumber=2;
        permission2.permissionName="UserManagement";
        permission2.permissionFaName="مدیریت فرم ها";
        permission2.order=2;

        Permission permission3=new Permission();
        permission3.permissionNumber=3;
        permission3.permissionName="UserManagement";
        permission3.permissionFaName="تکمیل فرم ها";
        permission3.order=3;

        mongoOperations.save(permission1);
        mongoOperations.save(permission2);
        mongoOperations.save(permission3);

        mongoOperations.dropCollection(LoginHistory.class);
        mongoOperations.dropCollection(User.class);

        User user=new User();
        user.userName="admin";
        user.password=Hash.getSHA512("admin");
        user.firstName="admin";
        user.lastName="admin";
        user.dateCreated= DateTime.now().toString();
        user.addPermission(1);
        user.addPermission(2);
        user.addPermission(3);

        mongoOperations.save(user);
    }
}
