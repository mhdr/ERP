import lib.Router;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {

        int maxThreads = 512;
        int minThreads = 4;
        int timeOutMillis = 30000;
        threadPool(maxThreads, minThreads, timeOutMillis);

        port(13602);

        staticFiles.location("/public");
        //staticFiles.expireTime(60*10);

        Router router=new Router();
        // /
        router.root();

        // /api/getUsers
        router.getUsers();

        // /api/user/insertUser
        router.insertNewUser();
    }
}
