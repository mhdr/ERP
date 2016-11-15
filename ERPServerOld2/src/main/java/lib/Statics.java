package lib;

import com.mongodb.MongoClient;
import org.eclipse.jetty.util.log.Slf4jLog;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.impl.SimpleLogger;

public class Statics {
    public static MongoClient getMongo()
    {
        MongoClient mongo = new MongoClient("localhost",27017);
        return mongo;
    }

    public static Logger getLogger(Class type)
    {
        Logger logger= LoggerFactory.getLogger(type);

        return logger;
    }
}
