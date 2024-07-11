import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauPosteComponent } from './bureau-poste.component';

describe('BureauPosteComponent', () => {
  let component: BureauPosteComponent;
  let fixture: ComponentFixture<BureauPosteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BureauPosteComponent]
    });
    fixture = TestBed.createComponent(BureauPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
