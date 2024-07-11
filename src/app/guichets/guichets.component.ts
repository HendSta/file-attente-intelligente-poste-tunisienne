import { Component, OnInit } from '@angular/core';
import { GuichetService } from '../services/guichet.service';
import { UserService } from '../services/user.service';
import { Guichet } from '../shared/guichet';
import { Employe } from '../shared/employe';

@Component({
  selector: 'app-guichets',
  templateUrl: './guichets.component.html',
  styleUrls: ['./guichets.component.css']
})
export class GuichetsComponent implements OnInit {
  guichets: Guichet[] = [];
  employes: Map<number, Employe> = new Map<number, Employe>();

  constructor(private guichetService: GuichetService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchGuichets();
  }

  fetchGuichets(): void {
    this.guichetService.getAllGuichets().subscribe((guichets) => {
      this.guichets = guichets;
      this.guichets.forEach((guichet) => {
        if (guichet.cinEmploye) {
          this.userService.getEmployeById(guichet.cinEmploye).subscribe((employe) => {
            this.employes.set(guichet.cinEmploye, employe);
          });
        }
      });
    });
  }

  getEmployeName(cin: number): Employe | undefined {
    return this.employes.get(cin);
  }

  deleteGuichet(num_guichet: number): void {
    this.guichetService.deleteGuichet(num_guichet).subscribe(() => {
      this.guichets = this.guichets.filter(guichet => guichet.num_guichet !== num_guichet);
    });
  }
}
