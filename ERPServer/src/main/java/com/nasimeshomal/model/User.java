package com.nasimeshomal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "user")
public class User {

    @Id
    public String id;
    public String userName;
    public String firstName;
    public String lastName;
    public String password;
    public String dateCreated;
    public ArrayList<com.nasimeshomal.model.User.Permission> permissions;

    public User()
    {
        this.permissions=new ArrayList<>();
    }

    private static class Permission{

        public int permissionNumber;
    }

    public void addPermission(int permissionNumber)
    {
        Permission permission=new Permission();
        permission.permissionNumber=permissionNumber;
        this.permissions.add(permission);
    }
}
