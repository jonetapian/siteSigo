import { TestBed } from '@angular/core/testing';

import { PagSeguroService } from './pag-seguro.service';

describe('PagSeguroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagSeguroService = TestBed.get(PagSeguroService);
    expect(service).toBeTruthy();
  });
});
