package db;

import lib.Users;
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
}