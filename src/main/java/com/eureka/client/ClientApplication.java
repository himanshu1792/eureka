package com.eureka.client;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import javax.ws.rs.Produces;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ClientApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(ClientApplication.class, args);
	}
	
	@RequestMapping(path="/test", produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity checkResponse(){
		
		
		
		try{
		String tst = null;
		//tst.equalsIgnoreCase("a");
		String s = "done";
		return new ResponseEntity(s,HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity(e,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	

}
