package com.fileattenteintelligente.file_attente_intelligente.service;

import com.fileattenteintelligente.file_attente_intelligente.model.Employe;
import com.fileattenteintelligente.file_attente_intelligente.repository.EmployeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeService {
    @Autowired
    private EmployeRepo employeRepo;

    public Employe saveEmploye(Employe employe) {
        return employeRepo.save(employe);
    }

    public Optional<Employe> findByEmailAndPassword(String email, String mdp) {
        return employeRepo.findByEmailAndMdp(email, mdp);
    }

    public List<Employe> searchEmployes(String term) {
        try {
            // Trying to interpret the term as a CIN
            long cin = Long.parseLong(term);
            return employeRepo.findByCin(cin);
        } catch (NumberFormatException e) {
            // If the term is not a number, search by other fields
            return employeRepo.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCaseOrRoleContainingIgnoreCaseOrServiceContainingIgnoreCase(term, term, term, term);
        }
    }
}
