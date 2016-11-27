package com.nasimeshomal.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "permission")
public class Permission {

    @Id
    public String id;
    public int permissionNumber;
    public String permissionName="";
    public String permissionFaName="";
    public int order;


}
