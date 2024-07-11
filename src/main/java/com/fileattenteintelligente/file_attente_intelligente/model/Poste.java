package com.fileattenteintelligente.file_attente_intelligente.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Poste {
    @Id
    private long code_postal;

    private String adresse;

    private Date heure_debut;

    private Date heure_fin;

    private String status;

}
