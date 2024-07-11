import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit{

  showWelcomePage = true;

  ngOnInit(): void {
    // Logique pour cacher la page de bienvenue après un certain temps ou une action
    setTimeout(() => {
      this.showWelcomePage = false;
    }, 1000); // Cache la page de bienvenue après 1 secondes
  }
}
