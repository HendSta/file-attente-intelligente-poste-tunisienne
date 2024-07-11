package com.fileattenteintelligente.file_attente_intelligente.service;

import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import com.fileattenteintelligente.file_attente_intelligente.repository.PosteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PosteService {

    @Autowired
    private PosteRepo posteRepo;

    public Poste savePoste(Poste poste) {
        return posteRepo.save(poste);
    }

    public List<Poste> getAllPostes() {
        return posteRepo.findAll();
    }

    public Optional<Poste> getPosteById(Long code_postal) {
        return posteRepo.findById(code_postal);
    }

    public Poste updatePoste(Long code_postal, Poste posteDetails) {
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

    public void deletePoste(Long code_postal) {
        posteRepo.deleteById(code_postal);
    }
}
