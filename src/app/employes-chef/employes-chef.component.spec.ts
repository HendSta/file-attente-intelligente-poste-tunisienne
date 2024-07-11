import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesChefComponent } from './employes-chef.component';

describe('EmployesChefComponent', () => {
  let component: EmployesChefComponent;
  let fixture: ComponentFixture<EmployesChefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployesChefComponent]
    });
    fixture = TestBed.createComponent(EmployesChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
