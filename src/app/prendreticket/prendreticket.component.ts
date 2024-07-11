import { Component, OnInit } from '@angular/core';
import { BureauPosteService } from '../services/bureau-poste.service';
import { TicketService } from '../services/ticket.service';
import { Poste } from '../shared/poste';
import { Ticket } from '../shared/ticket';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prendreticket',
  templateUrl: './prendreticket.component.html',
  styleUrls: ['./prendreticket.component.css']
})
export class PrendreticketComponent implements OnInit {
  poste: Poste | undefined;
  currentTicketNumber: number = 0;
  selectedService: string = '';
  posteStatus: string = '';

  constructor(
    private bureauPosteService: BureauPosteService,
    private ticketService: TicketService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPosteAndTicketData();
  }

  fetchPosteAndTicketData(): void {
    this.bureauPosteService.getUniquePoste().subscribe(
      (poste: Poste) => {
        this.poste = poste;
        console.log('Poste fetched:', this.poste);
        this.fetchCurrentTicketNumber();
      },
      (error) => {
        console.error('Error fetching poste:', error);
      }
    );
  }

  fetchCurrentTicketNumber(): void {
    this.ticketService.getMaxTicketNumber().subscribe(
      (maxTicketNumber: number) => {
        this.currentTicketNumber = maxTicketNumber + 1;
        console.log('Max ticket number fetched:', maxTicketNumber);
        this.calculatePosteStatus();
      },
      (error) => {
        console.error('Error fetching max ticket number:', error);
      }
    );
  }
  

  calculatePosteStatus(): void {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        let count = 0;
        tickets.forEach(ticket => {
          if (ticket.status === 'en attente') {
            count++;
          }
        });

        this.posteStatus = count === 0 ? 'vide' : count > 0 && count <= 10 ? 'un peu encombré' : 'encombré';
        this.updatePosteStatus();
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  onSubmit(): void {
    const loggedInCin = this.userService.getLoggedInCin();
    const newTicket: Ticket = {
      numTicket: this.currentTicketNumber,
      cin_client: loggedInCin,
      status: 'en attente',
      poste: this.poste!,
      service: this.selectedService
    };

    this.ticketService.addTicket(newTicket).subscribe(
      (addedTicket: Ticket) => {
        console.log('Ticket added successfully:', addedTicket);
        this.currentTicketNumber += 1;
        this.updatePosteStatus();
        this.router.navigate(['/client/affiche-ticket', addedTicket.numTicket]);
      },
      (error) => {
        console.error('Error adding ticket:', error);
      }
    );
  }

  updatePosteStatus(): void {
    if (this.poste) {
      this.poste.status = this.posteStatus; // Update the status based on the current status logic

      this.bureauPosteService.updatePoste(this.poste.code_postal, this.poste).subscribe(
        (updatedPoste: Poste) => {
          console.log('Poste status updated successfully:', updatedPoste);
        },
        (error) => {
          console.error('Error updating poste status:', error);
        }
      );
    }
  }
}
