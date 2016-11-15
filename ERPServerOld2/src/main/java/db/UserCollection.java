package db;

import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import lib.Statics;
import org.bson.Document;

import java.util.ArrayList;
import java.util.function.Consumer;

public class UserCollection {

    public User insertNewUser(User user) {
        MongoClient mongoClient = Statics.getMongo();
        MongoDatabase db = mongoClient.getDatabase("ERP");
        MongoCollection<Document> userCollection = db.getCollection("user");

        String json = user.toJson();
        Document doc = Document.parse(json);

        userCollection.insertOne(doc);
        user._id = doc.getObjectId("_id");

        mongoClient.close();

        return user;
    }

    public User getUser(String userName) {
        MongoClient mongoClient = Statics.getMongo();
        MongoDatabase db = mongoClient.getDatabase("ERP");
        MongoCollection<Document> userCollection = db.getCollection("user");

        FindIterable<Document> matches= userCollection.find(new Document("userName",userName));

        Document result1= matches.first();

        if (result1==null)
        {
            return null;
        }

        User result= User.fromBson(result1);

        mongoClient.close();

        return result;
    }

    public ArrayList<User> getUsers() {

        ArrayList<User> result=new ArrayList<>();

        MongoClient mongoClient = Statics.getMongo();
        MongoDatabase db = mongoClient.getDatabase("ERP");
        MongoCollection<Document> userCollection = db.getCollection("user");

        FindIterable<Document> matches= userCollection.find();

        matches.forEach((Consumer<? super Document>) document -> {
            User user= User.fromBson(document);
            result.add(user);
        });

        mongoClient.close();

        return result;
    }
}
