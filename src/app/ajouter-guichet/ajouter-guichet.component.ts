import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuichetService } from '../services/guichet.service';
import { Guichet } from '../shared/guichet';

@Component({
  selector: 'app-ajouter-guichet',
  templateUrl: './ajouter-guichet.component.html',
  styleUrls: ['./ajouter-guichet.component.css']
})
export class AjouterGuichetComponent {
  guichet: Guichet = {
    num_guichet: 0,
    cinEmploye: 0,
    num_ticket: 0,
    code_postal: 0,
    status: 'vide'
  };

  constructor(private guichetService: GuichetService, private router: Router) {}

  onSubmit(): void {
    this.guichetService.addGuichet(this.guichet).subscribe(() => {
      this.router.navigate(['/admin/guichets']);
    });
  }
}
