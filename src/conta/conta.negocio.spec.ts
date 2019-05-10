import { StatusConta } from './status-conta.enum';
import { Parcela } from './parcela.model';
import { Test, TestingModule } from '@nestjs/testing';
import { ContaNegocio } from './conta.negocio';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from '../usuario/usuario.service';

describe('ContaNegocio', () => {

    describe('ao criar uma conta', () => {
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

        it('deve lançar um erro com uma data de vencimento inválida', () => {
            conta.dataVencimento = 'blabla';
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
        });

        it('deve definir uma data de lançamento', () => {
            conta = contaNegocio.criar(conta);
            expect(conta.dataLancamento).toBeDefined();
        });

        it('deve lançar um erro com um valor inferior a zero', () => {
            conta.valor = -1;
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.VALOR_INVALIDO));
        });

        it('deve lançar um erro caso o tipo da conta não for informado', () => {
            delete conta.tipo;
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.TIPO_INVALIDO));
        });

        it('deve lançar um erro caso o tipo informado seja inválido', () => {
            conta.tipo = 'foo';
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.TIPO_INVALIDO));
        });

        it('deve setar o usuário com base no usuário logado', () => {
            conta = contaNegocio.criar(conta);
            expect(conta.usuario).toBeDefined();
        });

        it('deve lançar um erro caso não haja usuário logado', () => {
            spyOn(usuarioService, 'getUsuarioLogado').and.returnValue(undefined);
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.USUARIO_NAO_LOGADO));
        });

        it('deve lançar um erro caso a data de vencimento não seja informada', () => {
            delete conta.dataVencimento;
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
        });

        it('deve lançar um erro caso o valor não seja informado', () => {
            delete conta.valor;
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.VALOR_INVALIDO));
        });

        it('deve lançar um erro caso o número de parcelas seja informado e o tipo seja diferente de CŔEDITO', () => {
            conta.numeroParcelas = 2;
            conta.tipo = TipoConta.CARTAO_DEBITO;
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.TIPO_INVALIDO_PARCELAS));
        });

        it('tendo o tipo correto para conta parcelada, retornar o número correto de parcelas', () => {
            conta.numeroParcelas = 2;
            conta.valor = 150;
            conta = contaNegocio.criar(conta);
            expect(conta.parcelas.length).toEqual(2);
        });

        it('sendo uma conta parcelada com valor PAR retornar a lista de parcelas com cada valor correto', () => {
            conta.numeroParcelas = 2;
            conta.valor = 150;
            conta = contaNegocio.criar(conta);
            conta.parcelas.forEach(parcela => {
                expect(parcela.valor).toEqual(75.00);
            });
        });

        it('sendo uma conta parcelada com valor IMPAR retornar a lista de parcelas com cada valor correto', () => {
            conta.numeroParcelas = 3;
            conta.valor = 97;
            conta = contaNegocio.criar(conta);
            conta.parcelas.forEach(parcela => {
                expect(parcela.valor).toBeCloseTo(32.33, 2);
            });
        });

        it('com uma conta parcelada com a primeira data de vencimento setada retornar corretamente o '
            + 'vencimento das proximas parcelas', () => {
                conta.numeroParcelas = 3;
                conta.dataVencimento = new Date('2019-12-15');
                conta = contaNegocio.criar(conta);
                const vencimentos: Date[] = conta.parcelas.map((parcela: Parcela) => parcela.vencimento);
                const vencimentosEsperados = [new Date('2019-12-15'), new Date('2020-01-15'), new Date('2020-02-15')];
                expect(vencimentosEsperados).toEqual(vencimentos);
            });

        it('deve gerar uma transação caso a conta seja do tipo DINHEIRO', () => {
            conta.tipo = TipoConta.DINHEIRO;
            conta = contaNegocio.criar(conta);
            expect(conta.transacoes.length === 1);
        });

        it('deve setar o status inicial da conta como em aberto', () => {
            conta = contaNegocio.criar(conta);
            expect(conta.status === StatusConta.EM_ABERTO);
        });

    });

    describe('ao alterar uma conta', () => {

        xit('deve lançar um erro com uma data de vencimento inválida', () => {});
        xit('deve lançar um erro com um valor inferior a zero', () => {});
        xit('deve lançar um erro caso o tipo da conta não for informado', () => {});
        xit('deve lançar um erro caso o tipo informado seja inválido', () => {});
        xit('deve lançar um erro caso a data de vencimento não seja informada', () => {});
        xit('deve lançar um erro caso o valor não seja informado', () => {});
        xit('caso a conta tenha parcelas deve atualizar o valor de cada parcela corretamente', () => {});
        xit('deve lançar um erro caso o número de parcelas seja informado e o tipo seja diferente de CŔEDITO', () => {});
        xit('inserindo uma nova data de vencimento inicial calcular corretamente os vencimentos de parcelas', () => {});

    });

    xdescribe('ao excluir uma conta', () => {});

});
