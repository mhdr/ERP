package com.nasimeshomal.model;

import com.nasimeshomal.config.ApplicationConfig;
import org.joda.time.DateTime;
import org.junit.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;

import static org.junit.Assert.*;


public class UserCollectionTest {
    @Test
    public void insert1() throws Exception {

        User user=new User();
        user.userName="mhdr";
        user.password="12345";
        user.firstName="Mahmood";
        user.lastName="Ramzani";
        user.dateCreated= DateTime.now().toString();

        //UserCollection userCollection=new UserCollection();
        //userCollection.insert(user);

        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(ApplicationConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        mongoOperation.save(user);
    }

    @Test
    public void insert2() throws Exception {

        User user=new User();
        user.userName="mhdr2";
        user.password="12345";
        user.firstName="Mahmood";
        user.lastName="Ramzani";
        user.dateCreated= DateTime.now().toString();


        // For Annotation
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(ApplicationConfig.class);
        UserRepository userRepository = (UserRepository) ctx.getBean("mongoTemplate");

        UserCollection userCollection=new UserCollection(userRepository);
        userCollection.insert(user);
    }

}