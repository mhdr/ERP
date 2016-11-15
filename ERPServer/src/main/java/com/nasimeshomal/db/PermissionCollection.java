package com.nasimeshomal.db;


import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.nasimeshomal.lib.Statics;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class PermissionCollection {

    public ArrayList<Permission> getPermissions()
    {
        ArrayList<Permission> result=new ArrayList<Permission>();

        MongoClient mongoClient = Statics.getMongo();
        MongoDatabase db = mongoClient.getDatabase("ERP");
        MongoCollection<Document> permissionCollection = db.getCollection("permissions");

        FindIterable<Document> matches= permissionCollection.find();

        matches.forEach((Consumer<? super Document>) document -> {
            Permission permission=Permission.fromBson(document);
            result.add(permission);
        });

        mongoClient.close();

        return result;
    }

    public ArrayList<Permission> getPermissions(ObjectId userId)
    {
        UserCollection userCollection=new UserCollection();
        User user=userCollection.getUser(userId);

        ArrayList<Permission> result=new ArrayList<Permission>();

        MongoClient mongoClient = Statics.getMongo();
        MongoDatabase db = mongoClient.getDatabase("ERP");
        MongoCollection<Document> permissionCollection = db.getCollection("permissions");

        FindIterable<Document> matches= permissionCollection.find(new Document("_id",userId));

        matches.forEach((Consumer<? super Document>) document -> {
            Permission permission=Permission.fromBson(document);

            if (user.contains(permission.permissionNumber))
            {
                result.add(permission);
            }
        });

        mongoClient.close();

        return result;
    }
}
