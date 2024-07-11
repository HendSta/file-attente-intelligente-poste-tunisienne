import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; // Assurez-vous que le chemin d'importation est correct
import { Employe } from '../shared/employe'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-moncompte-chef',
  templateUrl: './moncompte-chef.component.html',
  styleUrls: ['./moncompte-chef.component.css']
})
export class MoncompteChefComponent {

  user: Employe = {} as Employe;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const cinString = localStorage.getItem('cin');
    console.log('Retrieved CIN from localStorage:', cinString);

    if (cinString) {
      const cin = parseInt(cinString, 10);
      if (!isNaN(cin)) {
        this.userService.getEmployeById(cin).subscribe(user => {
          this.user = user;
        });
      } else {
        console.error('Invalid CIN stored in localStorage.');
      }
    } else {
      console.error('No CIN stored in localStorage.');
    }
  }
  

}
