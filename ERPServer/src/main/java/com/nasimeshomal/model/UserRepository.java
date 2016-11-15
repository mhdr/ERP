package com.nasimeshomal.model;

import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User,Long> {

    User findByUserName(String userName);

}
