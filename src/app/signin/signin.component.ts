import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  email: string = '';
  mdp: string = '';
  userRole: string = '';
  isLoggedIn: boolean = false;
  

  constructor(private userService: UserService,private router : Router) {
  }

  onSubmit(): void {
    this.userService.authenticate(this.email, this.mdp).subscribe(
      (response) => {
        if (response.role) {
          this.userRole = response.role;
          this.userService.setUserRole(this.userRole);
          this.userService.setLoggedIn(true);
          console.log("role", this.userRole);
          
          // Rediriger en fonction du rôle
          switch (this.userRole.toLowerCase()) {
            case 'admin':
              this.router.navigateByUrl('/admin');
              break;
            case 'chef':
              this.router.navigateByUrl('/chef');
              break;
            case 'agent':
              this.router.navigateByUrl('/agent');
              break;
            case 'client':
              this.router.navigateByUrl('/client');
              break;
            default:
              console.error('Unknown role:', this.userRole);
              break;
          }
  
          // Stocker le CIN dans localStorage si nécessaire
          if (response.cin) {
            localStorage.setItem('cin', response.cin.toString());
          }
        } else {
          console.error('Invalid response format from server');
        }
      },
      (error) => {
        console.error('Authentication failed', error);
        // Gérer les erreurs d'authentification ici
      }
    );
  }
  

  logout(): void {
    this.userService.logout();
    this.userService.setLoggedIn(false);
    this.userRole = '';
    this.router.navigateByUrl('/signin');
  }


}
