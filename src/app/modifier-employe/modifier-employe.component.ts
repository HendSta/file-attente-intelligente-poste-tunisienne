import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Employe } from '../shared/employe';

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.css']
})
export class ModifierEmployeComponent implements OnInit {
  user: Employe = { cin: 0, nom: '', prenom: '', code_postal: 0, tel: 0, email: '', mdp: '', date_naissance: new Date(), service: '', role: '' };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cinParam = params.get('cin');
      if (cinParam !== null) {
        const cin = +cinParam;
        this.userService.getEmployeById(cin).subscribe(
          (user) => {
            this.user = user;
            // Convert date string to Date object if necessary
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
        console.error('No CIN found in route parameters');
        // Handle case where no CIN is found in route parameters
      }
    });
  }

  onSubmit(): void {
    // Call the update method in the UserService
    this.userService.updateEmploye(this.user.cin, this.user).subscribe(
      (updatedUser) => {
        console.log('User updated:', updatedUser);
        // Redirect to the employees page after update
        this.router.navigateByUrl('/admin/employes');
      },
      (error) => {
        console.error('Error updating user:', error);
        // Handle errors here
      }
    );
  }
}
