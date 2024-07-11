import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelClientComponent } from './appel-client.component';

describe('AppelClientComponent', () => {
  let component: AppelClientComponent;
  let fixture: ComponentFixture<AppelClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppelClientComponent]
    });
    fixture = TestBed.createComponent(AppelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
