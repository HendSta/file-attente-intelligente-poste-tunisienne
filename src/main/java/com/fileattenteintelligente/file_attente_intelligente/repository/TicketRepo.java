package com.fileattenteintelligente.file_attente_intelligente.repository;

import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import com.fileattenteintelligente.file_attente_intelligente.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TicketRepo extends MongoRepository<Ticket, Long> {
    List<Ticket> findByPoste(Poste poste);
    @Query(value = "{}", sort = "{ 'numTicket' : -1 }")
    Ticket findFirstByOrderByNumTicketDesc();
}
