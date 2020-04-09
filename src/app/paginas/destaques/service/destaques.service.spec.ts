import { TestBed } from '@angular/core/testing';

import { DestaquesService } from './destaques.service';

describe('DestaquesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DestaquesService = TestBed.get(DestaquesService);
    expect(service).toBeTruthy();
  });
});
