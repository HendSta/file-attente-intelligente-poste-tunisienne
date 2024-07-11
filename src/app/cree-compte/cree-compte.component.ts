import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Client } from '../shared/client';

@Component({
  selector: 'app-cree-compte',
  templateUrl: './cree-compte.component.html',
  styleUrls: ['./cree-compte.component.css']
})
export class CreeCompteComponent {

  client: Client = {
    cin: 0,
    nom: '',
    prenom: '',
    tel: 0,
    email: '',
    mdp: '',
    date_naissance: new Date(),
    role: 'client'
  };

  confirmMdp: string = '';
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  creerClient() {
    this.submitted = true;
    if (this.client.mdp !== this.confirmMdp) {
      return;
    }
    this.userService.saveClient(this.client).subscribe(
      response => {
        console.log('Client created successfully', response);
        // Afficher une alerte de succès
        localStorage.setItem('accountCreated', 'true');
        this.router.navigate(['/signin']);
      },
      error => {
        console.error('Error creating client', error);
      }
    );
  }

  isUnderage(date_naissance: Date): boolean {
    const today = new Date();
    const birthDate = new Date(date_naissance);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 18;
  }
}
