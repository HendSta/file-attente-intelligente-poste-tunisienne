import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendreticketComponent } from './prendreticket.component';

describe('PrendreticketComponent', () => {
  let component: PrendreticketComponent;
  let fixture: ComponentFixture<PrendreticketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrendreticketComponent]
    });
    fixture = TestBed.createComponent(PrendreticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
