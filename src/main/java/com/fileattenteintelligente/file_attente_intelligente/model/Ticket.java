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
public class Ticket {

    @Id
    private long numTicket;

    private long cin_client;

    private String status;//en attente, servie,non servie

    private Poste poste;

    private String service;
}
