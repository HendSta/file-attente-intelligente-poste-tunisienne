import { Component, OnInit } from '@angular/core';
import { BureauPosteService } from '../services/bureau-poste.service';
import { Poste } from '../shared/poste';

@Component({
  selector: 'app-bureau-poste',
  templateUrl: './bureau-poste.component.html',
  styleUrls: ['./bureau-poste.component.css']
})
export class BureauPosteComponent implements OnInit {

  poste: Poste = {} as Poste;

  constructor(private bureauPosteService: BureauPosteService) { }

  ngOnInit(): void {
    this.getPosteDetails();
  }

  getPosteDetails(): void {
    this.bureauPosteService.getUniquePoste().subscribe(data => {
      this.poste = data;
    });
  }
}
