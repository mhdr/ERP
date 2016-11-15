package com.nasimeshomal.db;

import com.google.gson.Gson;
import org.bson.Document;
import org.bson.types.ObjectId;

public class Permission {
    public ObjectId _id;
    public int permissionNumber;
    public String permissionName;
    public String permissionFaName;
    public int order;

    public String toJson(){
        Gson gson=new Gson();
        String result=gson.toJson(this);
        return result;
    }

    public static User fromJson(String data)
    {
        Gson gson=new Gson();
        User user=gson.fromJson(data,User.class);
        return user;
    }

    public static Permission fromBson(Document data)
    {
        Permission permission=new Permission();
        permission._id=data.getObjectId("_id");
        permission.permissionNumber=data.getInteger("permissionNumber");
        permission.permissionName=data.getString("permissionName");
        permission.permissionFaName=data.getString("permissionFaName");
        permission.order=data.getInteger("order");
        return permission;
    }

    @Override
    public String toString() {
        String result=this.toJson();
        return result;
    }
}
