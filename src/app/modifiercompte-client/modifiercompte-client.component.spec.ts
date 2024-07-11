import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercompteClientComponent } from './modifiercompte-client.component';

describe('ModifiercompteClientComponent', () => {
  let component: ModifiercompteClientComponent;
  let fixture: ComponentFixture<ModifiercompteClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifiercompteClientComponent]
    });
    fixture = TestBed.createComponent(ModifiercompteClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
