package com.fileattenteintelligente.file_attente_intelligente.service;

import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import com.fileattenteintelligente.file_attente_intelligente.repository.PosteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class ResetTicketService {

    @Autowired
    private PosteRepo posteRepo;

    @Autowired
    private TicketService ticketService;

    @Scheduled(fixedDelay = 60000) // Vérifie toutes les minutes
    public void resetTicketsAfterPosteEndTime() {
        List<Poste> postes = posteRepo.findAll();
        for (Poste poste : postes) {
            if (isPosteEndTime(poste)) {
                System.out.println("Réinitialisation de tous les tickets pour le poste : " + poste.getCode_postal());
                ticketService.resetAllTickets();
            }
        }
    }

    private boolean isPosteEndTime(Poste poste) {
        Date now = new Date();
        Date heureFin = poste.getHeure_fin();
        LocalTime nowTime = convertToTime(now);
        LocalTime heureFinTime = convertToTime(heureFin);
        return nowTime.isAfter(heureFinTime);
    }

    private LocalTime convertToTime(Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
    }
}
