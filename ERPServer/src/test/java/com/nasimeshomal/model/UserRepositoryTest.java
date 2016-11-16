package com.nasimeshomal.model;

import com.nasimeshomal.ErpServerApplication;
import com.nasimeshomal.config.ApplicationConfig;
import com.nasimeshomal.lib.Hash;
import org.joda.time.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {ErpServerApplication.class})
public class UserRepositoryTest {

    @Test
    public void insert1() throws Exception {

        User user=new User();
        user.userName="mhdr";
        user.password="12345";
        user.firstName="Mahmood";
        user.lastName="Ramzani";
        user.dateCreated= DateTime.now().toString();

        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(ApplicationConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperation.save(user);
    }
}