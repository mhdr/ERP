package com.nasimeshomal.lib;

import com.nasimeshomal.config.MongoConfig;
import com.nasimeshomal.model.User;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Enumeration;
import java.util.Map;
import java.util.Objects;

public class SessionManager {

    HttpSession httpSession;
    HttpServletRequest request;
    HttpServletResponse response;
    MongoOperations mongoOperations;

    /**
     *
     * @param request Http Request
     * @param response Http Response
     */
    public SessionManager(HttpServletRequest request, HttpServletResponse response)
    {
        this.httpSession=request.getSession(true);
        this.request=request;
        this.response=response;

        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        this.mongoOperations = (MongoOperations) ctx.getBean("mongoTemplate");
    }

    public boolean isUserLoggedIn()
    {
        int numberOfRequiredKeys=2;
        int countRequired=0;
        Enumeration<String> keys= this.httpSession.getAttributeNames();

        while (keys.hasMoreElements())
        {
            String key=keys.nextElement();
            if (Objects.equals(key,"userName"))
            {
                countRequired++;
            }
            else if (Objects.equals(key,"loggedIn"))
            {
                countRequired++;
            }
        }

        if (countRequired==numberOfRequiredKeys)
        {
            String userName= (String) this.httpSession.getAttribute("userName");
            boolean loggedIn= (boolean) this.httpSession.getAttribute("loggedIn");

            if (StringUtils.isNotBlank(userName) && loggedIn)
            {
                return true;
            }
        }

        return false;
    }

    public User getCurrentUser()
    {
        String userName= (String) this.httpSession.getAttribute("userName");

        Query query = new Query();
        query.addCriteria(Criteria.where("userName").is(userName));
        User user = mongoOperations.findOne(query, User.class);
        return user;
    }

    public void login(String userName)
    {
        Query query = new Query();
        query.addCriteria(Criteria.where("userName").is(userName));
        User user = mongoOperations.findOne(query, User.class);

        this.httpSession.setAttribute("userName",userName);
        this.httpSession.setAttribute("loginDate",DateTime.now().toString());
        this.httpSession.setAttribute("loggedIn",true);
        this.httpSession.setAttribute("userId",user.id);
    }

    public void logout()
    {
        this.httpSession.setAttribute("loggedIn",false);
        this.httpSession.invalidate();

        for (Cookie cookie:request.getCookies())
        {
            if (Objects.equals(cookie.getName(), "ERPSession"))
            {
                // remove cookie
                cookie.setMaxAge(0);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
    }

    public void checkRemeberMe(Map<String, String[]> data)
    {
        boolean rememberMe=false;

        if (data.containsKey("rememberMe"))
        {
            rememberMe = Boolean.parseBoolean(data.get("rememberMe")[0]);
        }

        Cookie[] cookies=request.getCookies();

        if (!rememberMe)
        {
            for (Cookie cookie:cookies)
            {
                if (Objects.equals(cookie.getName(), "ERPSession"))
                {
                    // remove on browser restart
                    cookie.setMaxAge(-1);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }
        }
        else {
            for (Cookie cookie:cookies)
            {
                if (Objects.equals(cookie.getName(), "ERPSession"))
                {
                    cookie.setMaxAge(Integer.MAX_VALUE);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }

            // invalidate session after 2 weeks of inactivity
            request.getSession().setMaxInactiveInterval(3600*24*14);
        }
    }
}
