package com.fileattenteintelligente.file_attente_intelligente.service;

import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import com.fileattenteintelligente.file_attente_intelligente.model.Ticket;
import com.fileattenteintelligente.file_attente_intelligente.repository.TicketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    @Autowired
    private TicketRepo ticketRepo;

    public Ticket saveTicket(Ticket ticket) {
        return ticketRepo.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    public Optional<Ticket> getTicketById(Long numTicket) {
        return ticketRepo.findById(numTicket);
    }

    public Ticket updateTicket(Long numTicket, Ticket ticketDetails) {
        Optional<Ticket> optionalTicket = ticketRepo.findById(numTicket);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            ticket.setNumTicket(ticketDetails.getNumTicket());
            ticket.setCin_client(ticketDetails.getCin_client());
            ticket.setStatus(ticketDetails.getStatus());
            return ticketRepo.save(ticket);
        } else {
            throw new RuntimeException("Ticket not found with num " + numTicket);
        }
    }

    public void deleteTicket(Long numTicket) {
        ticketRepo.deleteById(numTicket);
    }

    public long findMaxTicketNumber() {
        Ticket maxTicket = ticketRepo.findFirstByOrderByNumTicketDesc();
        return (maxTicket != null) ? maxTicket.getNumTicket() : 0;
    }

    public void resetAllTickets() {
        ticketRepo.deleteAll();
    }

    public void resetTicketsByPoste(Poste poste) {
        List<Ticket> tickets = ticketRepo.findByPoste(poste);
        ticketRepo.deleteAll(tickets);
    }

    
}

