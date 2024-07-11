import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Employe } from '../shared/employe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-compte-admin',
  templateUrl: './modifier-compte-admin.component.html',
  styleUrls: ['./modifier-compte-admin.component.css']
})
export class ModifierCompteAdminComponent implements OnInit {

  user: Employe = { cin: 0, nom: '', prenom: '', code_postal: 0, tel: 0, email: '', mdp: '', date_naissance: new Date(), service: '', role: '' };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve user details from service or local storage
    const cinFromLocalStorage = localStorage.getItem('cin');
    if (cinFromLocalStorage) {
      const cin = parseInt(cinFromLocalStorage, 10);
      this.userService.getEmployeById(cin).subscribe(
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
    this.userService.updateEmploye(this.user.cin, this.user).subscribe(updatedUser => {
      console.log('User updated:', updatedUser);
      // Rediriger vers la page Mon Compte après la mise à jour
      this.router.navigateByUrl('/admin/moncompte');
    }, error => {
      console.error('Error updating user:', error);
      // Gérer les erreurs ici
    });
  }

}
