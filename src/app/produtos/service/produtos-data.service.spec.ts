import { TestBed } from '@angular/core/testing';

import { ProdutosDataService } from './produtos-data.service';

describe('ProdutosDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutosDataService = TestBed.get(ProdutosDataService);
    expect(service).toBeTruthy();
  });
});
