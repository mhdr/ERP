package com.nasimeshomal;

import com.nasimeshomal.model.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ErpServerApplication {

	//@Autowired
	//private UserRepository userRepository;

	public static void main(String[] args) {

		SpringApplication.run(ErpServerApplication.class, args);
	}
}
