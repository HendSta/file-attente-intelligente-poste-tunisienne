import { TestBed } from '@angular/core/testing';

import { BureauPosteService } from './bureau-poste.service';

describe('BureauPosteService', () => {
  let service: BureauPosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BureauPosteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
