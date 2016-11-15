package lib;

import com.google.gson.Gson;
import db.User;
import db.UserCollection;
import spark.ModelAndView;
import spark.QueryParamsMap;
import spark.Spark;
import spark.template.handlebars.HandlebarsTemplateEngine;

import java.util.ArrayList;
import java.util.Map;

import static spark.Spark.*;

public class Router {

    public Router() {

    }

    public void root() {
        get("/", (request, response) -> {
                    Session session = new Session(request, response);
                    return new ModelAndView(null, "index.hbs");
                },
                new HandlebarsTemplateEngine());
    }

    public void getUsers() {
        Spark.get("/api/getUsers", "application/json", (request, response) -> {

            Session session = new Session(request, response);
            Users users = new Users();
            Map result = users.getUsers();

            response.header("Content-Type", "application/json");
            return result;
        }, new JsonTransformer());
    }

    public void insertNewUser() {
        Spark.post("/api/user/insertUser", "application/json", (request, response) -> {
            Session session = new Session(request, response);

            response.header("Content-Type", "application/json");

            QueryParamsMap parameters = request.queryMap();
            Users users = new Users();
            Map result = users.insertNewUser(parameters);

            return result;
        }, new JsonTransformer());
    }
}

