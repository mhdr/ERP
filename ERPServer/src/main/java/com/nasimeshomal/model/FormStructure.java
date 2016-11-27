package com.nasimeshomal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "form_structure")
public class FormStructure {
    @Id
    public String id;
}
