import { Test, TestingModule } from '@nestjs/testing';
import { ContaNegocio } from './conta.negocio';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from '../usuario/usuario.service';

describe('Ao adicionar uma conta, ContaNegocio', () => {
  let contaNegocio: ContaNegocio;
  let usuarioService: UsuarioService;
  let conta: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContaNegocio, UsuarioService],
    }).compile();

    contaNegocio = module.get<ContaNegocio>(ContaNegocio);
    usuarioService = module.get<UsuarioService>(UsuarioService);

    conta = {
      dataVencimento: new Date('2019-05-01'),
      valor: 100.50,
      tipo: TipoConta.CARTAO_CREDITO,
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

  it('deve lançar um erro com um valor inferior a zero', () => {
    conta.valor = -1;
    expect(() => {
      contaNegocio.adicionar(conta);
    }).toThrow(new ContaException(ContaException.VALOR_INVALIDO));
  });

  it('deve lançar um erro caso o tipo da conta não for informado', () => {
    delete conta.tipo;
    expect(() => {
      contaNegocio.adicionar(conta);
    }).toThrow(new ContaException(ContaException.TIPO_INVALIDO));
  });

  it('deve lançar um erro caso o tipo informado seja inválido', () => {
    conta.tipo = 'foo';
    expect(() => {
      contaNegocio.adicionar(conta);
    }).toThrow(new ContaException(ContaException.TIPO_INVALIDO));
  });

  it('deve setar o usuário com base no usuário logado', () => {
    conta = contaNegocio.adicionar(conta);
    expect(conta.usuario).toBeDefined();
  });

  // TODO: Aprender a mockar um método de uma dependência.
  xit('deve lançar um erro caso não haja usuário logado', () => {
    spyOn(usuarioService, 'getUsuarioLogado').and.returnValue(undefined);
    expect(() => {
      contaNegocio.adicionar(conta);
    }).toThrowError();
  });

});
