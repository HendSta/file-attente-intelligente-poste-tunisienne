package com.fileattenteintelligente.file_attente_intelligente.service;

import com.fileattenteintelligente.file_attente_intelligente.model.Client;
import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import com.fileattenteintelligente.file_attente_intelligente.repository.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepo clientRepo;

    public Client saveClient(Client client) {
        if(client.getRole() == null) {
            client.setRole("client"); // Initialisation du rôle à "client" par défaut
        }
        return clientRepo.save(client);
    }

    public Optional<Client> findByEmailAndPassword(String email, String mdp) {
        return clientRepo.findByEmailAndMdp(email, mdp);
    }
}
