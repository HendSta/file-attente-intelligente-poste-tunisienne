package com.fileattenteintelligente.file_attente_intelligente.controller;

import com.fileattenteintelligente.file_attente_intelligente.model.Poste;
import com.fileattenteintelligente.file_attente_intelligente.model.Ticket;
import com.fileattenteintelligente.file_attente_intelligente.repository.TicketRepo;
import com.fileattenteintelligente.file_attente_intelligente.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketRepo ticketRepo;

    @PostMapping("/addTicket")
    public Ticket addTicket(@RequestBody Ticket ticket) {
        return ticketService.saveTicket(ticket);
    }

    @GetMapping("/getTickets")
    public List<Ticket> getAllTickets() {
        return ticketRepo.findAll();
    }

    @GetMapping("/getTicket/{numTicket}")
    public Optional<Ticket> getTicketById(@PathVariable Long numTicket) {
        return ticketRepo.findById(numTicket);
    }

    @PutMapping("/updateTicket/{numTicket}")
    public Ticket updateTicket(@PathVariable Long numTicket, @RequestBody Ticket ticketDetails) {
        Optional<Ticket> optionalTicket = ticketRepo.findById(numTicket);
        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            ticket.setNumTicket(ticketDetails.getNumTicket());
            ticket.setCin_client(ticketDetails.getCin_client());
            ticket.setStatus(ticketDetails.getStatus());
            return ticketRepo.save(ticket);
        } else {
            throw new RuntimeException("ticket not found with num " + numTicket);
        }
    }

    @DeleteMapping("/deleteTicket/{numTicket}")
    public void deleteTicket(@PathVariable Long numTicket) {
        ticketRepo.deleteById(numTicket);
    }

    @GetMapping("/maxTicketNumber")
    public ResponseEntity<Long> getMaxTicketNumber() {
        try {
            /*long maxTicketNumber = ticketService.findMaxTicketNumber();
            return ResponseEntity.ok(maxTicketNumber);*/
            long length = ticketRepo.count();
            return ResponseEntity.ok(length);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }


}
