import { TestBed } from '@angular/core/testing';

import { GuichetService } from './guichet.service';

describe('GuichetService', () => {
  let service: GuichetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuichetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
