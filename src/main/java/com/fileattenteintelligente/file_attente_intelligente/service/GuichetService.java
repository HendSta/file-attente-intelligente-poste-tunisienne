package com.fileattenteintelligente.file_attente_intelligente.service;

import com.fileattenteintelligente.file_attente_intelligente.model.Guichet;
import com.fileattenteintelligente.file_attente_intelligente.model.Ticket;
import com.fileattenteintelligente.file_attente_intelligente.repository.GuichetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuichetService {

    @Autowired
    private GuichetRepo guichetRepo;

    public Guichet saveGuichet(Guichet guichet) {
        return guichetRepo.save(guichet);
    }

    public List<Guichet> getAllGuichets() {
        return guichetRepo.findAll();
    }

    public Optional<Guichet> getGuichetById(Long num_guichet) {
        return guichetRepo.findById(num_guichet);
    }

    public Guichet updateGuichet(Long num_guichet, Guichet guichetDetails) {
        Optional<Guichet> optionalGuichet = guichetRepo.findById(num_guichet);
        if (optionalGuichet.isPresent()) {
            Guichet guichet = optionalGuichet.get();
            guichet.setCinEmploye(guichetDetails.getCinEmploye());
            guichet.setNum_ticket(guichetDetails.getNum_ticket());
            guichet.setStatus(guichetDetails.getStatus());
            return guichetRepo.save(guichet);
        } else {
            throw new RuntimeException("Guichet not found with num " + num_guichet);
        }
    }

    public void deleteGuichet(Long num_guichet) {
        guichetRepo.deleteById(num_guichet);
    }

    public Optional<Guichet> getGuichetByCinEmploye(Long cinEmploye) {
        return guichetRepo.findByCinEmploye(cinEmploye);
    }
}
