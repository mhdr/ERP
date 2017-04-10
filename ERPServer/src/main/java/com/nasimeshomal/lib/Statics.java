package com.nasimeshomal.lib;

import com.mongodb.MongoClient;
import org.apache.commons.io.IOUtils;

import java.io.*;

public class Statics {
    public static MongoClient getMongo()
    {
        MongoClient mongo = new MongoClient("localhost",27017);
        return mongo;
    }

    public String getVersion()
    {
        String result="-1";
        try {
            String fileName="build.txt";
            ClassLoader classLoader = getClass().getClassLoader();
            InputStream in = classLoader.getResourceAsStream(fileName);
            BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(in));
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