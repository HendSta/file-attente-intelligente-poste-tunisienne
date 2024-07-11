import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBureauPosteComponent } from './modifier-bureau-poste.component';

describe('ModifierBureauPosteComponent', () => {
  let component: ModifierBureauPosteComponent;
  let fixture: ComponentFixture<ModifierBureauPosteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierBureauPosteComponent]
    });
    fixture = TestBed.createComponent(ModifierBureauPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
