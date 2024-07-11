import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuichetsComponent } from './guichets.component';

describe('GuichetsComponent', () => {
  let component: GuichetsComponent;
  let fixture: ComponentFixture<GuichetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuichetsComponent]
    });
    fixture = TestBed.createComponent(GuichetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
