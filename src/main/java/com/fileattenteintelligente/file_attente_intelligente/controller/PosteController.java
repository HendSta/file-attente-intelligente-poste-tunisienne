package com.fileattenteintelligente.file_attente_intelligente.controller;

import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import com.fileattenteintelligente.file_attente_intelligente.repository.PosteRepo;
import com.fileattenteintelligente.file_attente_intelligente.service.PosteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PosteController {

    @Autowired
    private PosteRepo posteRepo;

    @Autowired
    private PosteService posteService;

    @PostMapping("/addPoste")
    public Poste addPoste(@RequestBody Poste poste) {
        return posteService.savePoste(poste);
    }

    @GetMapping("/getPosts")
    public List<Poste> getAllPostes() {
        return posteRepo.findAll();
    }

    @GetMapping("/getPoste/{code_postal}")
    public Optional<Poste> getPosteById(@PathVariable Long code_postal) {
        return posteRepo.findById(code_postal);
    }

    @PutMapping("/updatePoste/{code_postal}")
    public Poste updatePoste(@PathVariable Long code_postal, @RequestBody Poste posteDetails) {
        Optional<Poste> optionalPoste = posteRepo.findById(code_postal);
        if (optionalPoste.isPresent()) {
            Poste poste = optionalPoste.get();
            poste.setAdresse(posteDetails.getAdresse());
            poste.setHeure_debut(posteDetails.getHeure_debut());
            poste.setHeure_fin(posteDetails.getHeure_fin());
            poste.setStatus(posteDetails.getStatus());
            return posteRepo.save(poste);
        } else {
            throw new RuntimeException("Poste not found with id " + code_postal);
        }
    }

    @DeleteMapping("/deletePoste/{code_postal}")
    public void deletePoste(@PathVariable Long code_postal) {
        posteRepo.deleteById(code_postal);
    }

    @GetMapping("/getUniquePoste")
    public Optional<Poste> getUniquePoste() {
        return posteRepo.findAll().stream().findFirst();
    }
}
