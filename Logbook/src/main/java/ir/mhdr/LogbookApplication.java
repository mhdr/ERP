package ir.mhdr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories
public class LogbookApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogbookApplication.class, args);
	}
}
