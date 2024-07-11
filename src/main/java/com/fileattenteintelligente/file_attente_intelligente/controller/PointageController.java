package com.fileattenteintelligente.file_attente_intelligente.controller;

import com.fileattenteintelligente.file_attente_intelligente.model.Pointage;
import com.fileattenteintelligente.file_attente_intelligente.repository.PointageRepo;
import com.fileattenteintelligente.file_attente_intelligente.service.PointageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PointageController {

    @Autowired
    private PointageRepo pointageRepo;

    @Autowired
    private PointageService pointageService;

    @PostMapping("/addPointage")
    public Pointage addPointage(@RequestBody Pointage pointage) {
        return pointageService.savePointage(pointage);
    }

    @GetMapping("/getPointages")
    public List<Pointage> getAllPointages() {
        return pointageRepo.findAll();
    }

    @GetMapping("/getPointage/{id}")
    public Optional<Pointage> getPointageById(@PathVariable String id) {
        return pointageRepo.findById(id);
    }

    @PutMapping("/updatePointage/{id}")
    public Pointage updatePointage(@PathVariable String id, @RequestBody Pointage pointageDetails) {
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

    @DeleteMapping("/deletePointage/{id}")
    public void deletePointage(@PathVariable String id) {
        pointageRepo.deleteById(id);
    }

    @GetMapping("/pointage")
    public ResponseEntity<Pointage> getPointageByCINandDate(
            @RequestParam long cinEmploye,
            @RequestParam String dateDebut) { // Change Date to String
        Pointage pointage = pointageService.getPointageByCINandDate(cinEmploye, dateDebut);
        return pointage != null ? ResponseEntity.ok(pointage) : ResponseEntity.notFound().build();
    }

    @GetMapping("/searchPointages")
    public ResponseEntity<List<Pointage>> searchPointages(@RequestParam String term) {
        List<Pointage> pointages = pointageService.searchPointages(term);
        return ResponseEntity.ok(pointages);
    }

}
