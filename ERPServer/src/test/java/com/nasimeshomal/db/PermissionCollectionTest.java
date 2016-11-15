package com.nasimeshomal.db;

import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;

/**
 * Created by ma.ramezani on 11/14/2016.
 */
public class PermissionCollectionTest {
    @Test
    public void getPermissions() throws Exception {
        PermissionCollection permissionCollection=new PermissionCollection();
        ArrayList<Permission> permissions= permissionCollection.getPermissions();
        assertTrue(true);
    }

    @Test
    public void getPermissions1() throws Exception {
        UserCollection userCollection=new UserCollection();

        PermissionCollection permissionCollection=new PermissionCollection();

        User user=userCollection.getUser("mahmoodramzani");

        ArrayList<Permission> permissions= permissionCollection.getPermissions(user._id);
        assertTrue(true);
    }

}