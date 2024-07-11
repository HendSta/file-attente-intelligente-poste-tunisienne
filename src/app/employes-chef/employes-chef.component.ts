import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Employe } from '../shared/employe';
import { Guichet } from '../shared/guichet';
import { GuichetService } from '../services/guichet.service';

@Component({
  selector: 'app-employes-chef',
  templateUrl: './employes-chef.component.html',
  styleUrls: ['./employes-chef.component.css']
})
export class EmployesChefComponent implements OnInit {
  employes: Employe[] = [];
  guichets: Guichet[] = [];
  searchTerm: string = '';

  constructor(
    private userService: UserService,
    private guichetService: GuichetService
  ) {}

  ngOnInit(): void {
    const loggedInCin = localStorage.getItem('cin');
    if (loggedInCin) {
      this.userService.getEmployeById(parseInt(loggedInCin, 10)).subscribe(
        (user) => {
          this.userService.setCurrentUser(user);
          this.loadEmployes(user.service);
          this.loadGuichets();
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'utilisateur connecté :', error);
        }
      );
    }
  }

  loadEmployes(service: string): void {
    this.userService.getAllEmployes().subscribe(
      (data: Employe[]) => {
        this.employes = data.filter(employe => employe.service.toLowerCase() === service.toLowerCase());
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

  updateGuichet(employe: Employe, event: any): void {
    const guichetId = event.target.value;

    if (guichetId === 'default') {
      console.log("Sélectionnez un guichet valide.");
      return;
    }

    const numGuichet = parseInt(guichetId, 10);

    this.guichetService.updateGuichet(numGuichet, {
      num_guichet: numGuichet,
      cinEmploye: employe.cin,
      num_ticket: 0,
      code_postal: employe.code_postal,
      status: 'vide'
    }).subscribe(
      () => {
        console.log(`Association employé-guichet mise à jour pour l'employé ${employe.cin}`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'association employé-guichet :', error);
      }
    );
  }

  searchEmployes(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;
  
    const service = currentUser.service.toLowerCase();
  
    if (this.searchTerm.trim() === '') {
      this.loadEmployes(service);
      return;
    }
  
    this.userService.searchEmployes(this.searchTerm).subscribe(
      (data: Employe[]) => {
        this.employes = data.filter(employe => 
          employe.service.toLowerCase() === service
        );
      },
      (error) => {
        console.error('Erreur lors de la recherche des employés :', error);
      }
    );
  }
  
}
