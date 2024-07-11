import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chef-dashboard',
  templateUrl: './chef-dashboard.component.html',
  styleUrls: ['./chef-dashboard.component.css']
})
export class ChefDashboardComponent implements OnInit{

  showWelcomePage = true;

  ngOnInit(): void {
    // Logique pour cacher la page de bienvenue après un certain temps ou une action
    setTimeout(() => {
      this.showWelcomePage = false;
    }, 1000); // Cache la page de bienvenue après 1 secondes
  }

}
