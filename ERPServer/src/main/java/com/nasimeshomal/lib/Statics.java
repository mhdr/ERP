package com.nasimeshomal.lib;

import com.mongodb.MongoClient;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.StringReader;

public class Statics {
    public static MongoClient getMongo()
    {
        MongoClient mongo = new MongoClient("localhost",27017);
        return mongo;
    }

    public static String getVersion()
    {
        String result="-1";
        try {
            BufferedReader bufferedReader=new BufferedReader(new FileReader("src/main/resources/build.txt"));
            String buildNumberStr= bufferedReader.readLine();
            bufferedReader.close();
            result=buildNumberStr;
        }
        catch (Exception ex)
        {
            // exception
            ex.printStackTrace();
        }
        return result;
    }
}