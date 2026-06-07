package com.jjh.jpstudy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class JpStudyBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(JpStudyBackendApplication.class, args);
    }
}