import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompteAdminComponent } from './modifier-compte-admin.component';

describe('ModifierCompteAdminComponent', () => {
  let component: ModifierCompteAdminComponent;
  let fixture: ComponentFixture<ModifierCompteAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierCompteAdminComponent]
    });
    fixture = TestBed.createComponent(ModifierCompteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
