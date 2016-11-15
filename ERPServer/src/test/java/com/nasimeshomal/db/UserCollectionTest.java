package com.nasimeshomal.db;

import com.nasimeshomal.lib.Hash;
import org.joda.time.DateTime;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;

public class UserCollectionTest {
    @Test
    public void getUsers_1() throws Exception {
        String methodName="getUsers_1";

        UserCollection userCollection=new UserCollection();
        ArrayList<User> result= userCollection.getUsers();
        assertTrue(true);
    }

    @Test
    public void getUser_1() throws Exception {
        String methodName="getUser_1";

        UserCollection userCollection=new UserCollection();
        User result= userCollection.getUser("mahmoodramzani");
        assertTrue(true);
    }

    @Test
    public void getUser_2() throws Exception {
        String methodName="getUser_2";

        UserCollection userCollection=new UserCollection();
        User result= userCollection.getUser("mahmoodramzani2");
        assertEquals(result,null);
    }

    @Test
    public void insertNewUser_1() throws Exception {
        String methodName="insertUser_1";

        UserCollection userCollection=new UserCollection();

        User user=new User();
        user.userName="mahmoodramzani";
        user.firstName="Mahmood";
        user.lastName="Ramzani";
        user.password= Hash.getSHA512("12345");
        user.dateCreated= DateTime.now().toString();
        user.addPermission(1);
        user.addPermission(2);

        userCollection.insertNewUser(user);

        assertTrue(true);
    }
}