package com.fileattenteintelligente.file_attente_intelligente.controller;


import com.fileattenteintelligente.file_attente_intelligente.model.Client;
import com.fileattenteintelligente.file_attente_intelligente.repository.ClientRepo;
import com.fileattenteintelligente.file_attente_intelligente.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ClientController {

    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    private ClientService clientService;

    @PostMapping("/addClient")
    public Client addClient(@RequestBody Client client) {
        return clientService.saveClient(client);
    }

    @GetMapping("/getClients")
    public List<Client> getAllClients() {
        return clientRepo.findAll();
    }

    @GetMapping("/getClient/{cin}")
    public Optional<Client> getClientById(@PathVariable Long cin) {
        return clientRepo.findById(cin);
    }

    @PutMapping("/updateClient/{cin}")
    public Client updateClient(@PathVariable Long cin, @RequestBody Client clientDetails) {
        Optional<Client> optionalClient = clientRepo.findById(cin);
        if (optionalClient.isPresent()) {
            Client client = optionalClient.get();
            client.setNom(clientDetails.getNom());
            client.setPrenom(clientDetails.getPrenom());
            client.setTel(clientDetails.getTel());
            client.setEmail(clientDetails.getEmail());
            client.setMdp(clientDetails.getMdp());
            return clientRepo.save(client);
        } else {
            throw new RuntimeException("Client not found with cin " + cin);
        }
    }

    @DeleteMapping("/deleteClient/{cin}")
    public void deleteClient(@PathVariable Long cin) {
        clientRepo.deleteById(cin);
    }
}
