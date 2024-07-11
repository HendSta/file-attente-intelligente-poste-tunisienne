import { Component, OnInit } from '@angular/core';
import { PointageService } from '../services/pointage.service';
import { Pointage } from '../shared/pointage';
import { Employe } from '../shared/employe';
import { UserService } from '../services/user.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  totalHoursWorked: number = 0;
  averageHoursWorked: number = 0;
  totalEmployees: number = 0;
  pointages: Pointage[] = [];

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Heures travaillées par mois',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };

  public lineChartType: ChartType = 'line';

  public barChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Heures travaillées par employé',
        backgroundColor: 'rgba(63,81,181,0.5)',
        borderColor: 'rgba(63,81,181,1)',
        pointBackgroundColor: 'rgba(63,81,181,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(63,81,181,0.8)',
        fill: 'origin',
      }
    ],
    labels: []
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';

  constructor(private pointageService: PointageService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchAllPointages();
    this.fetchTotalEmployees();
  }

  fetchAllPointages(): void {
    this.pointageService.getAllPointages().subscribe(
      (pointages: Pointage[]) => {
        this.pointages = pointages;
        this.calculateStatistics();
        this.updateChartData();
      },
      error => {
        console.error('Error fetching pointages:', error);
      }
    );
  }

  fetchTotalEmployees(): void {
    this.userService.getAllEmployes().subscribe(
      (employes: Employe[]) => {
        this.totalEmployees = employes.length;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  calculateStatistics(): void {
    if (this.pointages.length > 0) {
      this.totalHoursWorked = this.calculateTotalHours();
      this.averageHoursWorked = this.calculateAverageHours();
    }
  }

  calculateTotalHours(): number {
    return this.pointages.reduce((total, pointage) => total + pointage.nombreHeures, 0);
  }

  calculateAverageHours(): number {
    return this.totalHoursWorked / this.pointages.length;
  }

  updateChartData(): void {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const monthlyHours = this.calculateMonthlyHours();
    const averageMonthlyHours = this.calculateAverageMonthlyHours(); // New method for average hours
  
    this.lineChartData.labels = months;
    this.lineChartData.datasets[0].data = averageMonthlyHours; // Use average monthly hours for line chart
  
    const employeeHours = this.calculateEmployeeHours();
    this.barChartData.labels = Object.keys(employeeHours);
    this.barChartData.datasets[0].data = Object.values(employeeHours);
  }  

  calculateMonthlyHours(): number[] {
    const months = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12]; // Example months (replace with actual logic to fetch months from database)
    const monthlyHours: number[] = new Array(12).fill(0); // Initialize array to store monthly hours
  
    // Fetch pointages from service and calculate total hours per month
    this.pointageService.getAllPointages().subscribe(
      (pointages: Pointage[]) => {
        pointages.forEach(pointage => {
          const monthIndex = new Date(pointage.dateDebut).getMonth(); // Get month index from dateDebut
          monthlyHours[monthIndex] += pointage.nombreHeures; // Accumulate hours for the month
        });
  
        // Update chart data after calculating monthly hours
        this.lineChartData.datasets[0].data = monthlyHours;
        this.lineChartData.labels = months.map(month => this.getMonthName(month)); // Convert month numbers to names
      },
      error => {
        console.error('Error fetching pointages:', error);
      }
    );
  
    return monthlyHours;
  }
  
  getMonthName(month: number): string {
    const monthNames =  ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December']; // Replace with full month names
    return monthNames[month - 1] || '';
  }
  

  calculateAverageMonthlyHours(): number[] {
    const monthlyHours = this.calculateMonthlyHours();
    const numberOfEmployees = this.totalEmployees > 0 ? this.totalEmployees : 1; // Avoid division by zero
  
    return monthlyHours.map(hours => hours / numberOfEmployees);
  }
  

  calculateEmployeeHours(): { [key: string]: number } {
    const employeeHours: { [key: string]: number } = {};

    // Calculate total hours per employee
    this.pointages.forEach(pointage => {
      if (employeeHours[`${pointage.cinEmploye}`]) {
        employeeHours[`${pointage.cinEmploye}`] += pointage.nombreHeures;
      } else {
        employeeHours[`${pointage.cinEmploye}`] = pointage.nombreHeures;
      }
    });

    return employeeHours;
  }
}
