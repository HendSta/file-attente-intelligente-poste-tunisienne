import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { GuichetService } from '../services/guichet.service';
import { TicketService } from '../services/ticket.service';
import { Guichet } from '../shared/guichet';
import { Employe } from '../shared/employe';
import { Ticket } from '../shared/ticket';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-appel-client',
  templateUrl: './appel-client.component.html',
  styleUrls: ['./appel-client.component.css']
})
export class AppelClientComponent implements OnInit {
  employe: Employe | undefined;
  guichet: Guichet | undefined;
  currentTicket?: Ticket;
  speechSynthesis: SpeechSynthesis;
  arabicTextToRead: string = '';
  successMessage: string = ''; // Message de succès pour l'alerte
  errorMessage: string = ''; // Message d'erreur pour l'alerte

  constructor(
    private userService: UserService,
    private guichetService: GuichetService,
    private ticketService: TicketService,
    private translate: TranslateService
  ) {
    this.speechSynthesis = window.speechSynthesis;
  }

  ngOnInit(): void {
    const cin = this.userService.getLoggedInCin();
  
    this.userService.getEmployeById(cin).subscribe((data: Employe) => {
      this.employe = data;
      console.log('Employé:', this.employe);
  
      this.guichetService.getGuichetByCin(this.employe.cin).subscribe((guichetData: Guichet) => {
        this.guichet = guichetData;
        console.log('Guichet:', this.guichet);
  
        this.ticketService.getAllTickets().subscribe((tickets: Ticket[]) => {
          console.log('Tickets:', tickets);
          this.setNextTicket(tickets);
          console.log('Current Ticket:', this.currentTicket);
        });
      });
    });
  }

  setNextTicket(tickets: Ticket[]): void {
    console.log(tickets); // Verify that tickets are being fetched
    const employeServiceLower = this.employe?.service.toLowerCase();
    for (let ticket of tickets) {
      if (ticket.status === 'en attente' && ticket.service.toLowerCase() === employeServiceLower) {
        this.currentTicket = ticket;
        console.log(this.currentTicket); // Verify that the ticket is assigned
        this.updateGuichetTicket(this.currentTicket.numTicket); // Update guichet with current ticket numTicket
        break;
      }
    }
    if (!this.currentTicket) {
      console.log('No matching ticket found.');
    }
  }

  updateTicketStatus(status: string): void {
    if (this.currentTicket) {
      this.currentTicket.status = status;
      this.ticketService.updateTicket(this.currentTicket.numTicket, this.currentTicket).subscribe(() => {
        this.nextTicket();
        if (status === 'servi') {
          this.successMessage = 'Client a été bien servi!';
        } else if (status === 'non servi') {
          this.errorMessage = 'Client n\'a pas été servi.';
        }
        this.clearMessages(); // Appel pour effacer les messages après 5 secondes
      });
    }
  }
  

  clearMessages(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 5000); // Délai de 5000 millisecondes (5 secondes)
  }  

  updateGuichetTicket(numTicket: number): void {
    if (this.guichet) {
      this.guichet.num_ticket = numTicket;
      this.guichetService.updateGuichet(this.guichet.num_guichet, this.guichet).subscribe(() => {
        console.log('Guichet updated with num_ticket');
      });
    }
  }

  nextTicket(): void {
    this.ticketService.getAllTickets().subscribe((tickets: Ticket[]) => {
      this.setNextTicket(tickets);
    });
  }

  // Méthode pour obtenir la traduction du texte en arabe et le lire à haute voix
  getDemoTextTranslationAndRead(): void {
    const numTicketText = convertNumberToArabicWords(this.currentTicket?.numTicket ?? 0);
    const numGuichetText = convertNumberToArabicWords(this.guichet?.num_guichet ?? 0);
    this.translate.get('demo.text1', { numTicket: numTicketText, numGuichet: numGuichetText }).subscribe((translatedText: string) => {
      this.arabicTextToRead = translatedText;
      this.readArabicText();
    });
  }
  
  readArabicText(): void {
    const utterance = new SpeechSynthesisUtterance(this.arabicTextToRead);
    utterance.lang = 'ar-SA'; // Setting the language to Arabic (Saudi Arabia)
    this.speechSynthesis.speak(utterance);
  }

  
}

// Fonction pour convertir les nombres en mots arabes
function convertNumberToArabicWords(num: number): string {
  const arabicOnes = ["", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"];
  const arabicTens = ["", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون"];
  const arabicTeens = ["عشرة", "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر"];
  const arabicHundreds = ["", "مائة", "مائتان", "ثلاثمائة", "أربعمائة", "خمسمائة", "ستمائة", "سبعمائة", "ثمانمائة", "تسعمائة"];
  const arabicThousands = ["", "ألف", "ألفان", "ثلاثة آلاف", "أربعة آلاف", "خمسة آلاف", "ستة آلاف", "سبعة آلاف", "ثمانية آلاف", "تسعة آلاف"];

  if (num === 0) return "صفر";

  if (num < 10) return arabicOnes[num];
  
  if (num < 20) return arabicTeens[num - 10];
  
  if (num < 100) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return `${arabicOnes[ones]} و ${arabicTens[tens]}`.trim();
  }

  if (num < 1000) {
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;
    const remainderText = convertNumberToArabicWords(remainder);

    if (remainder === 0) return arabicHundreds[hundreds];

    return `${arabicHundreds[hundreds]} و ${remainderText}`.trim();
  }

  const thousands = Math.floor(num / 1000);
  const remainder = num % 1000;
  const remainderText = convertNumberToArabicWords(remainder);

  if (remainder === 0) return arabicThousands[thousands];

  return `${arabicThousands[thousands]} و ${remainderText}`.trim();
}




