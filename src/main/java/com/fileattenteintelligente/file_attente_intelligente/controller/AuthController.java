package com.fileattenteintelligente.file_attente_intelligente.controller;

import com.fileattenteintelligente.file_attente_intelligente.model.Client;
import com.fileattenteintelligente.file_attente_intelligente.model.Employe;
import com.fileattenteintelligente.file_attente_intelligente.service.ClientService;
import com.fileattenteintelligente.file_attente_intelligente.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private ClientService clientService;

    @Autowired
    private EmployeService employeService;

    @PostMapping("/auth")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        System.out.println("AuthRequest received with email: " + authRequest.getEmail());

        Optional<Client> client = clientService.findByEmailAndPassword(authRequest.getEmail(), authRequest.getMdp());
        if (client.isPresent()) {
            Client clientData = client.get();
            System.out.println("Client found: " + clientData);
            AuthResponse response = new AuthResponse(clientData.getCin(), clientData.getRole(), "client");
            return ResponseEntity.ok(response);
        }

        Optional<Employe> employe = employeService.findByEmailAndPassword(authRequest.getEmail(), authRequest.getMdp());
        if (employe.isPresent()) {
            Employe employeData = employe.get();
            System.out.println("Employe found: " + employeData);
            AuthResponse response = new AuthResponse(employeData.getCin(), employeData.getRole(), "employe");
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }

}

class AuthRequest {
    private String email;
    private String mdp;

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }
}

class AuthResponse {
    private long cin;
    private String role;
    private String userType;

    public AuthResponse(long cin, String role, String userType) {
        this.cin = cin;
        this.role = role;
        this.userType = userType;
    }

    // Getters and setters
    public long getCin() {
        return cin;
    }

    public void setCin(long cin) {
        this.cin = cin;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}




