import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoncompteChefComponent } from './moncompte-chef.component';

describe('MoncompteChefComponent', () => {
  let component: MoncompteChefComponent;
  let fixture: ComponentFixture<MoncompteChefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoncompteChefComponent]
    });
    fixture = TestBed.createComponent(MoncompteChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
