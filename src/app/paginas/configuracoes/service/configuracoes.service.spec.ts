import { TestBed } from '@angular/core/testing';

import { ConfiguracoesService } from './configuracoes.service';

describe('ConfiguracoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguracoesService = TestBed.get(ConfiguracoesService);
    expect(service).toBeTruthy();
  });
});
