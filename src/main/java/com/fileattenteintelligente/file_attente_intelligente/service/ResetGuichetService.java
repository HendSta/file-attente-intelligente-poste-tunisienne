package com.fileattenteintelligente.file_attente_intelligente.service;


import com.fileattenteintelligente.file_attente_intelligente.model.Guichet;
import com.fileattenteintelligente.file_attente_intelligente.repository.GuichetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResetGuichetService {

    @Autowired
    private GuichetRepo guichetRepo;

    @Scheduled(cron = "0 0 7 * * ?")
    public void resetGuichets() {
        List<Guichet> guichets = guichetRepo.findAll();
        for (Guichet guichet : guichets) {
            guichet.setCinEmploye(0);
            guichet.setStatus("vide");
        }
        guichetRepo.saveAll(guichets);
    }
}
