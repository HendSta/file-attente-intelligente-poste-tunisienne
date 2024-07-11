package com.fileattenteintelligente.file_attente_intelligente.repository;

import com.fileattenteintelligente.file_attente_intelligente.model.Employe;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface EmployeRepo extends MongoRepository<Employe, Long> {
    Optional<Employe> findByEmailAndMdp(String email, String mdp);
    List<Employe> findByCin(long cin);
    List<Employe> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCaseOrRoleContainingIgnoreCaseOrServiceContainingIgnoreCase(String nom, String prenom, String role, String service);
    List<Employe> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(String nom, String prenom);
}
