package com.nasimeshomal.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserCollection {

    private final UserRepository repository;

    @Autowired
    public UserCollection(UserRepository repository) {
        this.repository = repository;
    }

    public void insert(User user)
    {
        repository.save(user);
    }
}
