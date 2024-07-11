import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterGuichetComponent } from './ajouter-guichet.component';

describe('AjouterGuichetComponent', () => {
  let component: AjouterGuichetComponent;
  let fixture: ComponentFixture<AjouterGuichetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterGuichetComponent]
    });
    fixture = TestBed.createComponent(AjouterGuichetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
