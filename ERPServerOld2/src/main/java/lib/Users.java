package lib;

import db.User;
import db.UserCollection;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import spark.QueryParamsMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Users {
    public Users()
    {

    }

    public Map<String,Object> getUsers()
    {
        Map<String,Object> result=new HashMap<String,Object>();

        try {
            UserCollection userCollection=new UserCollection();
            ArrayList<User> users= userCollection.getUsers();
            ArrayList<Map<String,String>> usersMap=new ArrayList<Map<String, String>>();

            for (User user : users)
            {
                // remove admin
                if (Objects.equals(user.userName, "admin"))
                {
                    continue;
                }

                Map<String,String> mUser=new HashMap<String,String>();

                mUser.put("id",user._id.toString());
                mUser.put("userName",user.userName);
                mUser.put("firstName",user.firstName);
                mUser.put("lastName",user.lastName);

                usersMap.add(mUser);
            }

            result.put("users",usersMap);
            result.put("error",0);
        }
        catch (Exception ex)
        {
            // exception
            result.put("error",1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String,Object> insertNewUser(QueryParamsMap data)
    {
        Map<String,Object> result=new HashMap<String,Object>();

        try {
            String userName=data.value("userName");
            String firstName=data.value("firstName");
            String lastName=data.value("lastName");
            String password=data.value("password");
            String repeatPassword=data.value("repeatPassword");

            if (StringUtils.isBlank(userName))
            {
                // empty userName
                result.put("error",2);
                return result;
            }

            if (StringUtils.isBlank(firstName))
            {
                // empty firstName
                result.put("error",3);
                return result;
            }

            if (StringUtils.isBlank(lastName))
            {
                // empty lastName
                result.put("error",4);
                return result;
            }

            if (StringUtils.isBlank(password))
            {
                // empty lastName
                result.put("error",5);
                return result;
            }

            if (StringUtils.isBlank(repeatPassword))
            {
                // empty lastName
                result.put("error",6);
                return result;
            }

            if (!Objects.equals(password, repeatPassword))
            {
                // psswords mismatch
                result.put("error",7);
                return result;
            }

            UserCollection userCollection =new UserCollection();

            if (userCollection.getUser(userName)!=null)
            {
                // userName is in use
                result.put("error",8);
                return result;
            }

            User user=new User();
            user.userName=userName;
            user.firstName=firstName;
            user.lastName=lastName;
            user.password=Hash.getSHA512(password);
            user.dateCreated= DateTime.now().toString();


            User newUser= userCollection.insertNewUser(user);

            result.put("id",newUser._id.toString());
            result.put("error",0);
        }
        catch (Exception ex)
        {
            // exception
            result.put("error",1);
            ex.printStackTrace();
        }

        return result;
    }
}
