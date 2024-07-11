import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterEmployeComponent } from './ajouter-employe.component';

describe('AjouterEmployeComponent', () => {
  let component: AjouterEmployeComponent;
  let fixture: ComponentFixture<AjouterEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterEmployeComponent]
    });
    fixture = TestBed.createComponent(AjouterEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
