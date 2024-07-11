import { Component, OnInit } from '@angular/core';
import { Client } from '../shared/client';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifiercompte-client',
  templateUrl: './modifiercompte-client.component.html',
  styleUrls: ['./modifiercompte-client.component.css']
})
export class ModifiercompteClientComponent implements OnInit{

  user: Client = { cin: 0, nom: '', prenom: '', tel: 0, email: '', mdp: '', date_naissance: new Date(), role: 'client' };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve user details from service or local storage
    const cinFromLocalStorage = localStorage.getItem('cin');
    if (cinFromLocalStorage) {
      const cin = parseInt(cinFromLocalStorage, 10);
      this.userService.getClientById(cin).subscribe(
        (user) => {
          this.user = user;
          // Convert date string to Date object
          if (this.user.date_naissance) {
            this.user.date_naissance = new Date(this.user.date_naissance);
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
          // Handle error fetching user
        }
      );
    } else {
      console.error('No CIN found in localStorage');
      // Handle case where no CIN found in localStorage
    }
  }

  onSubmit(): void {
    // Appeler la méthode de mise à jour de l'utilisateur dans le service UserService
    this.userService.updateClient(this.user.cin, this.user).subscribe(updatedUser => {
      console.log('User updated:', updatedUser);
      // Rediriger vers la page Mon Compte après la mise à jour
      this.router.navigateByUrl('/client/moncompte-client');
    }, error => {
      console.error('Error updating user:', error);
      // Gérer les erreurs ici
    });
  }


}
