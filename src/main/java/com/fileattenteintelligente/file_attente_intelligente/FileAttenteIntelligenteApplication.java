package com.fileattenteintelligente.file_attente_intelligente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class FileAttenteIntelligenteApplication {

	public static void main(String[] args) {
		SpringApplication.run(FileAttenteIntelligenteApplication.class, args);
	}

}
