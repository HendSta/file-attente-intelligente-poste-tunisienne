import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Assurez-vous que le chemin d'importation est correct
import { Employe } from '../shared/employe'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

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
