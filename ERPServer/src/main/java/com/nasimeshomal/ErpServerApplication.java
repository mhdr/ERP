package com.nasimeshomal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class ErpServerApplication {

	public static void main(String[] args) {

		SpringApplication.run(ErpServerApplication.class, args);
	}

}
