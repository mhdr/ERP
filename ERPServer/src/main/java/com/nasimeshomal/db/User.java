package com.nasimeshomal.db;

import com.google.gson.Gson;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.joda.time.DateTime;

import java.util.ArrayList;

public class User {

    public User(){
        this.permissions=new ArrayList<>();
    }

    public ObjectId _id;
    public String userName;
    public String firstName;
    public String lastName;
    public String password;
    public String dateCreated;
    public ArrayList<Permission> permissions;

    public String toJson(){
        Gson gson=new Gson();
        String result=gson.toJson(this);
        return result;
    }

    public void addPermission(int permissionNumber)
    {
        Permission p=new Permission();
        p.permissionNumber=permissionNumber;
        this.permissions.add(p);
    }

    public boolean contains(int permissionNumber){

        for (Permission p:permissions)
        {
            if (p.permissionNumber==permissionNumber)
            {
                return true;
            }
        }

        return false;
    }

    public static User fromJson(String data)
    {
        Gson gson=new Gson();
        User user=gson.fromJson(data,User.class);
        return user;
    }

    public static User fromBson(Document data)
    {
        User user=new User();
        user._id=data.getObjectId("_id");
        user.userName=data.getString("userName");
        user.firstName=data.getString("firstName");
        user.lastName=data.getString("lastName");
        user.password=data.getString("password");
        user.dateCreated=data.getString("dateCreated");
        user.permissions= user.extractPermissions(data);

        return user;
    }

    private ArrayList<Permission> extractPermissions(Document data)
    {
        ArrayList<Permission> result=new ArrayList<>();

        ArrayList<Document> permissions= (ArrayList<Document>) data.get("permissions");

        for (Document document:permissions)
        {
            int permissionNumber=document.getInteger("permissionNumber");
            result.add(new Permission(permissionNumber));
        }

        return result;
    }

    @Override
    public String toString() {
        String result=this.toJson();
        return result;
    }

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