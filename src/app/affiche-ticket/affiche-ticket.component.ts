import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../shared/ticket';

@Component({
  selector: 'app-affiche-ticket',
  templateUrl: './affiche-ticket.component.html',
  styleUrls: ['./affiche-ticket.component.css']
})
export class AfficheTicketComponent implements OnInit {
  ticket: Ticket | undefined;
  currentDate: Date = new Date(); // Date et heure actuelles
  totalTickets: number = 0;
  estimatedWaitTime: string = '00h 56mn'; // Temps d'attente estimé statique exemple
  showSuccessAlert: boolean = false; // Variable pour afficher l'alerte de succès

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router // Injection du Router
  ) {}

  ngOnInit(): void {
    const numTicket = this.route.snapshot.paramMap.get('numTicket');
    if (numTicket) {
      this.ticketService.getTicketById(Number(numTicket)).subscribe(
        (ticket: Ticket) => {
          this.ticket = ticket;
          this.showSuccessAlert = true; // Active l'alerte de succès après récupération du ticket

          // Masque l'alerte après 5 secondes
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 3000); //3 secondes
        },
        (error) => {
          console.error('Erreur lors de la récupération du ticket :', error);
          // Gérer l'erreur ici
        }
      );
    }

    this.fetchTotalTickets();
  }

  fetchTotalTickets(): void {
    this.ticketService.getMaxTicketNumber().subscribe(
      (totalTickets: number) => {
        this.totalTickets = totalTickets;
        this.fetchEstimatedWaitTime();
      },
      (error) => {
        console.error('Erreur lors de la récupération du nombre total de tickets :', error);
        // Gérer l'erreur ici
      }
    );
  }
  
  fetchEstimatedWaitTime(): void {
    this.ticketService.getAllTickets().subscribe(
      (tickets: Ticket[]) => {
        let count = 0;
        tickets.forEach(ticket => {
          if (ticket.status === 'en attente') {
            count++;
          }
        });
  
        // Calcul des heures et minutes
        const minutesParTicket = 1; // En supposant 1 minute par ticket en statut "en attente"
        const totalMinutes = count * minutesParTicket;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
  
        // Formatage du temps d'attente estimé
        this.estimatedWaitTime = `${this.pad(hours)}h ${this.pad(minutes)}mn`;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tickets :', error);
        // Gérer l'erreur ici
      }
    );
  }
  
  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  
  goBack(): void {
    this.router.navigate(['/client/prendreticket']);
  }
}
