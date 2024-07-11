import { TestBed } from '@angular/core/testing';

import { PointageService } from './pointage.service';

describe('PointageService', () => {
  let service: PointageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
