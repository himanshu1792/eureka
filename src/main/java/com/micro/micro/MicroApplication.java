package com.micro.micro;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class MicroApplication {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void main(String[] args) {
		
		
		List list = new ArrayList();
		Iterator l =  list.iterator();
		
		while(l.hasNext()){
			
			l.next();l.next();
			
			l.forEachRemaining(s->s.hashCode());
		}
		
		list.stream().filter(new Predicate() {

			
			@Override
			public boolean test(Object t) {
				// TODO Auto-generated method stub
				return false;
			}
		});
		
		SpringApplication.run(MicroApplication.class, args);
	}

}
