import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  showWelcomePage = true;

  ngOnInit(): void {
    // Logique pour cacher la page de bienvenue après un certain temps ou une action
    setTimeout(() => {
      this.showWelcomePage = false;
    }, 1000); // Cache la page de bienvenue après 1 seconde
  }

}
