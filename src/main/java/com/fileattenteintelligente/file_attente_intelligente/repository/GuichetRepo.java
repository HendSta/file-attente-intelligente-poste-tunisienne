package com.fileattenteintelligente.file_attente_intelligente.repository;

import com.fileattenteintelligente.file_attente_intelligente.model.Guichet;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GuichetRepo extends MongoRepository<Guichet, Long> {

    Optional<Guichet> findByCinEmploye(Long cinEmploye);
}
