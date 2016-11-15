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

    private class Permission{

        public int permissionNumber;

        public Permission()
        {

        }

        public Permission(int permissionNumber)
        {
            this.permissionNumber=permissionNumber;
        }
    }
}
