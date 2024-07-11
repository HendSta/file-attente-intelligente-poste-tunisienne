package com.fileattenteintelligente.file_attente_intelligente.repository;

import com.fileattenteintelligente.file_attente_intelligente.model.Client;
import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ClientRepo extends MongoRepository<Client, Long> {

    Optional<Client> findByEmailAndMdp(String email, String mdp);
}
