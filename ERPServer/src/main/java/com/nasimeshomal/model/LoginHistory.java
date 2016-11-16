package com.nasimeshomal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "login_history")
public class LoginHistory {
    @Id
    public String id;

    public String userId;
    public String ip;
    public String sessionId;
    public String loginDate;

    public LoginHistory()
    {

    }

    public LoginHistory(String userId,String ip,String sessionId,String loginDate)
    {
        this.userId=userId;
        this.ip=ip;
        this.sessionId=sessionId;
        this.loginDate=loginDate;
    }
}
