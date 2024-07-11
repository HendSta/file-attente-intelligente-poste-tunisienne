import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Employe } from '../shared/employe';
import { Guichet } from '../shared/guichet';
import { GuichetService } from '../services/guichet.service';

@Component({
  selector: 'app-employes-admin',
  templateUrl: './employes-admin.component.html',
  styleUrls: ['./employes-admin.component.css']
})
export class EmployesAdminComponent implements OnInit {
  employes: Employe[] = [];
  guichets: Guichet[] = [];
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private guichetService: GuichetService
  ) {}

  ngOnInit(): void {
    this.loadEmployes();
    this.loadGuichets();
  }

  loadEmployes(): void {
    this.userService.getAllEmployes().subscribe(
      (data: Employe[]) => {
        this.employes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des employés :', error);
      }
    );
  }

  loadGuichets(): void {
    this.guichetService.getAllGuichets().subscribe(
      (data: Guichet[]) => {
        this.guichets = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des guichets :', error);
      }
    );
  }

  updateRole(employe: Employe, event: any): void {
    const role = event.target.value; // Get the selected value from the event
    employe.role = role;
    this.userService.updateEmploye(employe.cin, employe).subscribe(
      () => {
        console.log(`Rôle mis à jour pour l'employé ${employe.cin}`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rôle :', error);
      }
    );
  }

  updateService(employe: Employe, event: any): void {
    const service = event.target.value; // Get the selected value from the event
    employe.service = service;
    this.userService.updateEmploye(employe.cin, employe).subscribe(
      () => {
        console.log(`Service mis à jour pour l'employé ${employe.cin}`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du service :', error);
      }
    );
  }

  updateGuichet(employe: Employe, event: any): void {
    const guichetId = event.target.value; // Récupère la valeur sélectionnée du <select>

    if (guichetId === 'default') {
      console.log("Sélectionnez un guichet valide.");
      return;
    }

    const numGuichet = parseInt(guichetId, 10); // Convertir la chaîne en nombre si nécessaire

    // Mettez à jour le guichet avec l'employé affecté et définissez le statut à "occupé"
    const updatedGuichet: Guichet = {
      num_guichet: numGuichet,
      cinEmploye: employe.cin,
      num_ticket: 0, // ou une valeur par défaut
      code_postal: employe.code_postal,
      status: 'occupé' // Mettez à jour le statut à "occupé"
    };

    this.guichetService.updateGuichet(numGuichet, updatedGuichet).subscribe(
      () => {
        console.log(`Association employé-guichet mise à jour pour l'employé ${employe.cin}`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'association employé-guichet :', error);
      }
    );
  }

  deleteEmploye(cin: number): void {
    this.userService.deleteEmploye(cin).subscribe(
      () => {
        this.loadEmployes();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'employé :', error);
      }
    );
  }

  searchEmployes(): void {
    this.userService.searchEmployes(this.searchTerm).subscribe(
      (data: Employe[]) => {
        this.employes = data;
      },
      (error) => {
        console.error('Erreur lors de la recherche des employés :', error);
      }
    );
  }
}
