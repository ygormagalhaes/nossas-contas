import { Test, TestingModule } from '@nestjs/testing';
import { ContaNegocio } from './conta.negocio';
import { ContaException } from './conta.exception';
import { ContaModel } from './conta.model';

describe('Ao adicionar uma conta ContaNegocio', () => {
  let contaNegocio: ContaNegocio;
  let conta;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaNegocio],
    }).compile();

    contaNegocio = module.get<ContaNegocio>(ContaNegocio);

    conta = {
      dataVencimento: new Date('2019-05-01'),
    };
  });

  it('deve estar definido pelo Nest', () => {
    expect(contaNegocio).toBeDefined();
  });

  it('deve lançar um erro com uma data de vencimento inválida', () => {
    conta.dataVencimento = 'blabla';
    expect(() => {
      contaNegocio.adicionar(conta);
    }).toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
  });

  it('deve definir uma data de lançamento', () => {
    conta = contaNegocio.adicionar(conta);
    expect(conta.dataLancamento).toBeDefined();
  });

});
