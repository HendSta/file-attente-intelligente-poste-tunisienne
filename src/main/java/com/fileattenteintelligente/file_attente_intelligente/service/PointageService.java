package com.fileattenteintelligente.file_attente_intelligente.service;
import com.fileattenteintelligente.file_attente_intelligente.model.Employe;
import com.fileattenteintelligente.file_attente_intelligente.model.Guichet;
import com.fileattenteintelligente.file_attente_intelligente.model.Pointage;
import com.fileattenteintelligente.file_attente_intelligente.repository.EmployeRepo;
import com.fileattenteintelligente.file_attente_intelligente.repository.PointageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointageService {

    @Autowired
    private PointageRepo pointageRepo;

    @Autowired
    private EmployeRepo employeRepo;

    public Pointage savePointage(Pointage pointage) {
        return pointageRepo.save(pointage);
    }

    public List<Pointage> getAllPointages() {
        return pointageRepo.findAll();
    }

    public Optional<Pointage> getPointageById(String id) {
        return pointageRepo.findById(id);
    }

    public Pointage updatePointage(String id, Pointage pointageDetails) {
        Optional<Pointage> optionalPointage = pointageRepo.findById(id);
        if (optionalPointage.isPresent()) {
            Pointage pointage = optionalPointage.get();
            pointage.setDateDebut(pointageDetails.getDateDebut());
            pointage.setDateFin(pointageDetails.getDateFin());
            pointage.setNombreHeures(pointage.getNombreHeures());
            return pointageRepo.save(pointage);
        } else {
            throw new RuntimeException("Pointage not found with id " + id);
        }
    }

    public void deletePointage(String id) {
        pointageRepo.deleteById(id);
    }

    public Pointage getPointageByCINandDate(long cinEmploye, String dateDebut) {
        return pointageRepo.findByCinEmployeAndDateDebut(cinEmploye, dateDebut);
    }


    public List<Pointage> searchPointages(String term) {
        try {
            long cin = Long.parseLong(term);
            return pointageRepo.findByCinEmploye(cin);
        } catch (NumberFormatException e) {
            List<Employe> employes = employeRepo.findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(term, term);
            return employes.stream()
                    .flatMap(employe -> pointageRepo.findByCinEmploye(employe.getCin()).stream())
                    .collect(Collectors.toList());
        }
    }
}
