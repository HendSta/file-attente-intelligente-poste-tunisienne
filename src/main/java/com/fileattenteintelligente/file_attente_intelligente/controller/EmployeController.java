package com.fileattenteintelligente.file_attente_intelligente.controller;

import com.fileattenteintelligente.file_attente_intelligente.model.Employe;
import com.fileattenteintelligente.file_attente_intelligente.repository.EmployeRepo;
import com.fileattenteintelligente.file_attente_intelligente.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class EmployeController {
    @Autowired
    private EmployeRepo employeRepo;

    @Autowired
    private EmployeService employeService;

    @PostMapping("/addEmploye")
    public Employe addEmploye(@RequestBody Employe employe) {
        return employeService.saveEmploye(employe);
    }

    @GetMapping("/employes")
    public List<Employe> getAllEmployes() {
        return employeRepo.findAll();
    }

    @GetMapping("/employe/{cin}")
    public Optional<Employe> getEmployeById(@PathVariable Long cin) {
        return employeRepo.findById(cin);
    }

    @PutMapping("/updateEmploye/{cin}")
    public Employe updateEmploye(@PathVariable Long cin, @RequestBody Employe employeDetails) {
        Optional<Employe> optionalEmploye = employeRepo.findById(cin);
        if (optionalEmploye.isPresent()) {
            Employe employe = optionalEmploye.get();
            employe.setCode_postal(employeDetails.getCode_postal());
            employe.setNom(employeDetails.getNom());
            employe.setPrenom(employeDetails.getPrenom());
            employe.setTel(employeDetails.getTel());
            employe.setEmail(employeDetails.getEmail());
            employe.setMdp(employeDetails.getMdp());
            employe.setService(employeDetails.getService());
            employe.setRole(employeDetails.getRole());
            return employeRepo.save(employe);
        } else {
            throw new RuntimeException("Employe not found with cin " + cin);
        }
    }

    @DeleteMapping("/deleteEmploye/{cin}")
    public void deleteEmploye(@PathVariable Long cin) {
        employeRepo.deleteById(cin);
    }

    @GetMapping("/employes/search")
    public List<Employe> searchEmployes(@RequestParam String term) {
        return employeService.searchEmployes(term);
    }
}
