package com.fileattenteintelligente.file_attente_intelligente.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Guichet {

    @Id
    private long num_guichet;

    private long cinEmploye;

    private long num_ticket;

    private long code_postal;

    private String status;
}
