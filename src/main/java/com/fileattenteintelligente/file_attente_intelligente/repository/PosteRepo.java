package com.fileattenteintelligente.file_attente_intelligente.repository;

import com.fileattenteintelligente.file_attente_intelligente.model.Employe;
import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PosteRepo extends MongoRepository<Poste, Long> {
}
