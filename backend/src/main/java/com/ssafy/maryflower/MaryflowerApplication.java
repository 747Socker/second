package com.ssafy.maryflower;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class MaryflowerApplication {

	public static void main(String[] args) {
		// 시간 설정
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		SpringApplication.run(MaryflowerApplication.class, args);
	}

}
