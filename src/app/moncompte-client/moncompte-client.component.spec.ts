import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoncompteClientComponent } from './moncompte-client.component';

describe('MoncompteClientComponent', () => {
  let component: MoncompteClientComponent;
  let fixture: ComponentFixture<MoncompteClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoncompteClientComponent]
    });
    fixture = TestBed.createComponent(MoncompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
