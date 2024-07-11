import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Employe } from '../shared/employe';

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.css']
})
export class AjouterEmployeComponent implements OnInit {
  user: Employe = {
    cin: 0,
    nom: '',
    prenom: '',
    code_postal: 0,
    tel: 0,
    email: '',
    mdp: '',
    date_naissance: new Date(),
    service: '',
    role: ''
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Additional initialization code if needed
  }

  onSubmit(): void {
    this.userService.saveEmploye(this.user).subscribe(
      response => {
        console.log('Employé ajouté avec succès', response);
        this.router.navigate(['/admin/employes']); // Redirect to another page
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'employé', error);
      }
    );
  }
}
