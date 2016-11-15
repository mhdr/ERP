package lib;
import spark.Request;
import spark.Response;
import sun.management.counter.perf.PerfInstrumentation;
import sun.security.krb5.Config;

import static spark.Spark.*;


public class Session {

    private Request request;
    private Response response;
    private spark.Session session;

    public Session(Request request, Response response)
    {
        this.request=request;
        this.response=response;
        this.session=this.request.session(true);
        this.configSession();
    }

    private void configSession()
    {

    }
}
