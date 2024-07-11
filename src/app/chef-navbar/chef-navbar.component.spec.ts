import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefNavbarComponent } from './chef-navbar.component';

describe('ChefNavbarComponent', () => {
  let component: ChefNavbarComponent;
  let fixture: ComponentFixture<ChefNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChefNavbarComponent]
    });
    fixture = TestBed.createComponent(ChefNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
