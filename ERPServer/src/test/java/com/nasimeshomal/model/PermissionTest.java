package com.nasimeshomal.model;


import com.nasimeshomal.ErpServerApplication;
import com.nasimeshomal.config.MongoConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertTrue;

public class PermissionTest {

    @Test
    public void insert1() throws Exception {

        Permission permission1=new Permission();
        permission1.permissionNumber=1;
        permission1.permissionName="Admin";
        permission1.permissionFaName="مدیریت";
        permission1.order=1;

        Permission permission2=new Permission();
        permission2.permissionNumber=2;
        permission2.permissionName="UserAdmin";
        permission2.permissionFaName="مدیریت کاربران";
        permission2.order=2;

        Permission permission3=new Permission();
        permission3.permissionNumber=3;
        permission3.permissionName="FormAdmin";
        permission3.permissionFaName="مدیریت فرم ها";
        permission3.order=3;


        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperation.insert(permission1);

        assertTrue(true);
    }
}
