package com.nasimeshomal.model;


import com.nasimeshomal.ErpServerApplication;
import com.nasimeshomal.config.ApplicationConfig;
import com.nasimeshomal.lib.Hash;
import org.joda.time.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ErpServerApplication.class})
public class PermissionTest {

    @Test
    public void insert1() throws Exception {

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

        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(ApplicationConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperation.save(permission1);
        mongoOperation.save(permission2);
        mongoOperation.save(permission3);

        assertTrue(true);
    }
}
