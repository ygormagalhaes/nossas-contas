import { Test, TestingModule } from '@nestjs/testing';
import { ContaNegocio } from './conta.negocio';

describe('ContaNegocio', () => {
  let negocio: ContaNegocio;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaNegocio],
    }).compile();

    negocio = module.get<ContaNegocio>(ContaNegocio);
  });

  it('deve estar definido pelo Nest', () => {
    expect(negocio).toBeDefined();
  });
});
