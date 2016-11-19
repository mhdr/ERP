package com.nasimeshomal.model;

import com.nasimeshomal.ErpServerApplication;
import com.nasimeshomal.config.MongoConfig;
import com.nasimeshomal.lib.Hash;
import org.joda.time.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ErpServerApplication.class})
public class UserTest {

    @Test
    public void insert1() throws Exception {

        User user=new User();
        user.userName="mahmoodramzani";
        user.password=Hash.getSHA512("12345");
        user.firstName="Mahmood";
        user.lastName="Ramzani";
        user.dateCreated= DateTime.now().toString();

        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperation.save(user);
    }

    @Test
    public void insert2() throws Exception {

        User user=new User();
        user.userName="mahmood";
        user.password=Hash.getSHA512("12345");
        user.firstName="Mahmood";
        user.lastName="Ramzani";
        user.dateCreated= DateTime.now().toString();
        user.addPermission(1);
        user.addPermission(2);

        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperation.save(user);
    }

    @Test
    public void insert3() throws Exception {

        User user=new User();
        user.userName="admin";
        user.password=Hash.getSHA512("admin");
        user.firstName="admin";
        user.lastName="admin";
        user.dateCreated= DateTime.now().toString();
        user.addPermission(1);
        user.addPermission(2);

        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperation.save(user);
    }
}