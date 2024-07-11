package com.fileattenteintelligente.file_attente_intelligente.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employe {

    @Id
    private long cin;

    private String nom;

    private String prenom;

    private long code_postal;

    private long tel;

    private String email;

    private String mdp;

    private Date date_naissance;

    private String service;

    private String role;
}
