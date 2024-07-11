import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    // Vérifier si l'utilisateur est authentifié
    if (this.userService.isLoggedIn()) {
      // Vérifier le rôle de l'utilisateur
      const userRole = this.userService.getUserRole();
      if (userRole === 'client') {
        return true;
      } else if (userRole === 'agent') {
        return true;
      }else if (userRole ==='chef'){
        return true;
      }else if (userRole ==='admin'){
        return true;
      }
    }

    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié ou n'a pas le rôle approprié
    this.router.navigate(['/signin']);
    return false;
  }
}
