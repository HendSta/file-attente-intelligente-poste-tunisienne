package com.fileattenteintelligente.file_attente_intelligente.controller;

import com.fileattenteintelligente.file_attente_intelligente.model.Guichet;
import com.fileattenteintelligente.file_attente_intelligente.model.Ticket;
import com.fileattenteintelligente.file_attente_intelligente.repository.GuichetRepo;
import com.fileattenteintelligente.file_attente_intelligente.service.GuichetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class GuichetController {

    @Autowired
    private GuichetRepo guichetRepo;

    @Autowired
    private GuichetService guichetService;

    @PostMapping("/addGuichet")
    public Guichet addGuichet(@RequestBody Guichet guichet) {
        return guichetService.saveGuichet(guichet);
    }

    @GetMapping("/getGuichets")
    public List<Guichet> getAllGuichets() {
        return guichetRepo.findAll();
    }

    @GetMapping("/getGuichet/{num_guichet}")
    public Optional<Guichet> getGuichetById(@PathVariable Long num_guichet) {
        return guichetRepo.findById(num_guichet);
    }

    @PutMapping("/updateGuichet/{num_guichet}")
    public Guichet updateGuichet(@PathVariable Long num_guichet, @RequestBody Guichet guichetDetails) {
        Optional<Guichet> optionalGuichet = guichetRepo.findById(num_guichet);
        if (optionalGuichet.isPresent()) {
            Guichet guichet = optionalGuichet.get();
            guichet.setCinEmploye(guichetDetails.getCinEmploye());
            guichet.setNum_ticket(guichetDetails.getNum_ticket());
            guichet.setStatus(guichetDetails.getStatus());
            return guichetRepo.save(guichet);
        } else {
            throw new RuntimeException("guichet not found with num " + num_guichet);
        }
    }

    @DeleteMapping("/deleteGuichet/{num_guichet}")
    public void deleteGuichet(@PathVariable Long num_guichet) {
        guichetRepo.deleteById(num_guichet);
    }

    @GetMapping("/getGuichetByCinEmploye/{cinEmploye}")
    public Optional<Guichet> getGuichetByCinEmploye(@PathVariable Long cinEmploye) {
        return guichetService.getGuichetByCinEmploye(cinEmploye);
    }
}
