package db;

import com.google.gson.Gson;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.eclipse.jetty.server.Authentication;
import org.joda.time.DateTime;
import spark.QueryParamsMap;

public class User {
    public ObjectId _id;
    public String userName;
    public String firstName;
    public String lastName;
    public String password;
    public String dateCreated;

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

    public static User fromBson(Document data)
    {
        User user=new User();
        user._id=data.getObjectId("_id");
        user.userName=data.getString("userName");
        user.firstName=data.getString("firstName");
        user.lastName=data.getString("lastName");
        user.password=data.getString("password");
        user.dateCreated=data.getString("dateCreated");

        return user;
    }

    @Override
    public String toString() {
        String result=this.toJson();
        return result;
    }
}
