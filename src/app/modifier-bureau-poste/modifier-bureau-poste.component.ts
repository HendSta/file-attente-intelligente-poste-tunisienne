import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BureauPosteService } from '../services/bureau-poste.service';
import { Poste } from '../shared/poste';

@Component({
  selector: 'app-modifier-bureau-poste',
  templateUrl: './modifier-bureau-poste.component.html',
  styleUrls: ['./modifier-bureau-poste.component.css']
})
export class ModifierBureauPosteComponent implements OnInit {
  poste: Poste = {} as Poste;

  constructor(
    private bureauPosteService: BureauPosteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPosteDetails();
  }

  getPosteDetails(): void {
    this.bureauPosteService.getUniquePoste().subscribe(data => {
      this.poste = data;
    });
  }

  onSubmit(): void {
    this.bureauPosteService.updatePoste(this.poste.code_postal, this.poste).subscribe(() => {
      this.router.navigate(['/admin/bureauposte']);
    });
  }
}
