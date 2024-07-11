import { Component, OnInit } from '@angular/core';
import { PointageService} from '../services/pointage.service';
import { UserService} from '../services/user.service';
import { Pointage } from '../shared/pointage';
import { Employe } from '../shared/employe';


@Component({
  selector: 'app-pointages',
  templateUrl: './pointages.component.html',
  styleUrls: ['./pointages.component.css']
})
export class PointagesComponent implements OnInit {
  pointages: Pointage[] = [];
  employesMap: Map<number, Employe> = new Map<number, Employe>();
  searchTerm: string = '';

  constructor(private pointageService: PointageService, private userService: UserService) {}

  ngOnInit(): void {
    this.pointageService.getAllPointages().subscribe(
      (pointages: Pointage[]) => {
        this.pointages = pointages;
        this.fetchEmployeDetails();
      },
      error => {
        console.error('Error fetching pointages:', error);
      }
    );
  }

  fetchEmployeDetails(): void {
    this.pointages.forEach(pointage => {
      this.userService.getEmployeById(pointage.cinEmploye).subscribe(
        (employe: Employe) => {
          this.employesMap.set(pointage.cinEmploye, employe);
        },
        error => {
          console.error('Error fetching employe details for CIN:', pointage.cinEmploye, error);
        }
      );
    });
  }

  getEmployeNom(cinEmploye: number): string {
    const employe = this.employesMap.get(cinEmploye);
    return employe ? employe.nom : 'N/A';
  }

  getEmployePrenom(cinEmploye: number): string {
    const employe = this.employesMap.get(cinEmploye);
    return employe ? employe.prenom : 'N/A';
  }

  searchPointage(): void {
    if (this.searchTerm.trim()) {
      this.pointageService.searchPointages(this.searchTerm).subscribe(
        (pointages: Pointage[]) => {
          this.pointages = pointages;
          this.fetchEmployeDetails();
        },
        error => {
          console.error('Error searching pointages:', error);
        }
      );
    } else {
      this.pointageService.getAllPointages();
    }
  }
}
