import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { PointageService } from '../services/pointage.service';
import { Pointage } from '../shared/pointage';

@Component({
  selector: 'app-agent-navbar',
  templateUrl: './agent-navbar.component.html',
  styleUrls: ['./agent-navbar.component.css']
})
export class AgentNavbarComponent {

  cinEmploye: number;
  dateDebut: Date = new Date();
  pointage: Pointage;

  constructor(private pointageService: PointageService, private userService: UserService) {
    this.cinEmploye = this.userService.getLoggedInCin();
    this.pointage = {
      cinEmploye: this.cinEmploye,
      dateDebut: this.dateDebut.toISOString(), // Convert to string
      dateFin: null,
      nombreHeures:0
    };
  }

  addPointage() {
    this.pointage.dateDebut = this.dateDebut.toISOString(); // Ensure dateDebut is a string
    this.pointageService.addPointage(this.pointage).subscribe(
      (data: Pointage) => {
        // Après l'ajout réussi, récupérez l'id attribué
        this.pointage.id = data.id; // Supposant que votre backend renvoie l'ID nouvellement créé
        console.log('Pointage added successfully:', data);
      },
      error => console.error(error)
    );
  }
  

  fetchPointage(): void {
    const formattedDateDebut = this.dateDebut.toISOString();
    console.log('Fetching pointage for CIN:', this.cinEmploye);
    console.log('Fetching pointage for Date:', formattedDateDebut);

    this.pointageService.getPointageByCINandDate(this.cinEmploye, formattedDateDebut)
      .subscribe(
        (data: Pointage) => {
          console.log('Pointage fetched:', data);
          // Gérer la réponse réussie ici
        },
        (error) => {
          console.error('Error fetching pointage:', error);
        }
      );
  }

  terminer() {
    // Mettre à jour la date de fin du pointage avec la date actuelle
    this.pointage.dateFin = new Date().toISOString();
  
    // Vérifier si l'ID est défini
    if (this.pointage.id) {
      // Calculer le nombre d'heures travaillées
      const startDate = new Date(this.pointage.dateDebut);
      const endDate = new Date(this.pointage.dateFin);
      const difference = Math.abs(endDate.getTime() - startDate.getTime());
      const hoursWorked = difference / (1000 * 3600); // Convertir en heures
      
      // Mettre à jour le pointage avec le nombre d'heures travaillées
      this.pointage.nombreHeures = hoursWorked;

      // Appeler le service pour mettre à jour le pointage avec la date de fin et le nombre d'heures travaillées
      this.pointageService.updatePointage(this.pointage.id, this.pointage).subscribe(
        data => {
          console.log('Pointage updated with end date and hours worked:', data);
          // Réussite de la mise à jour du pointage
        },
        error => {
          console.error('Error updating pointage with end date and hours worked:', error);
        }
      );
    } else {
      console.error('Cannot update pointage: ID is undefined');
      // Gérer le cas où l'ID n'est pas défini, par exemple, afficher un message d'erreur à l'utilisateur
    }
  }
}
