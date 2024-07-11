import { Component } from '@angular/core';
import { Client } from '../shared/client';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-moncompte-client',
  templateUrl: './moncompte-client.component.html',
  styleUrls: ['./moncompte-client.component.css']
})
export class MoncompteClientComponent {

  user: Client = {} as Client;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const cinString = localStorage.getItem('cin');
    console.log('Retrieved CIN from localStorage:', cinString);

    if (cinString) {
      const cin = parseInt(cinString, 10);
      if (!isNaN(cin)) {
        this.userService.getClientById(cin).subscribe(user => {
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
