import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheTicketComponent } from './affiche-ticket.component';

describe('AfficheTicketComponent', () => {
  let component: AfficheTicketComponent;
  let fixture: ComponentFixture<AfficheTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AfficheTicketComponent]
    });
    fixture = TestBed.createComponent(AfficheTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
