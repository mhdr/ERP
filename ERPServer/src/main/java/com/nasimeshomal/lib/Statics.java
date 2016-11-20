package com.nasimeshomal.lib;

import com.mongodb.MongoClient;

public class Statics {
    public static MongoClient getMongo()
    {
        MongoClient mongo = new MongoClient("localhost",27017);
        return mongo;
    }

    public static String getVersion()
    {
        return "1000";
    }
}