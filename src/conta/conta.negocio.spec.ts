import { UsuarioRepository } from './../usuario/usuario.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CartaoRepository } from './cartao.repository';
import { ContaRepository } from './conta.repository';
import { StatusConta } from './status-conta.enum';
import { Parcela } from './parcela.model';
import { ContaNegocio } from './conta.negocio';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { ContaService } from './conta.service';

describe('ContaNegocio', () => {

    let contaNegocio: ContaNegocio;
    let usuarioService: UsuarioService;
    let conta: any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CartaoRepository,
                ContaNegocio,
                ContaRepository,
                ContaService,
                UsuarioService,
                UsuarioRepository,
            ],
        }).compile();

        contaNegocio = module.get<ContaNegocio>(ContaNegocio);
        usuarioService = module.get<UsuarioService>(UsuarioService);

        conta = {
            dataVencimento: new Date('2019-05-01'),
            valor: 100.50,
            tipo: TipoConta.CARTAO_CREDITO,
            cartao: {
                id: 1,
            },
        };
    });

    describe('ao criar uma conta', () => {

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

        // TODO: Voltar método após implementação do módulo de usuários.
        xit('deve setar o usuário com base no usuário logado', () => {
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
            conta.quantidadeParcelas = 2;
            conta.tipo = TipoConta.CARTAO_DEBITO;
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.TIPO_INVALIDO_PARCELAS));
        });

        it('tendo o tipo correto para conta parcelada, retornar o número correto de parcelas', () => {
            conta.quantidadeParcelas = 2;
            conta.valor = 150;
            conta = contaNegocio.criar(conta);
            expect(conta.parcelas.length).toEqual(2);
        });

        it('sendo uma conta parcelada com valor PAR retornar a lista de parcelas com cada valor correto', () => {
            conta.quantidadeParcelas = 2;
            conta.valor = 150;
            conta = contaNegocio.criar(conta);
            conta.parcelas.forEach(parcela => {
                expect(parcela.valor).toEqual(75.00);
            });
        });

        it('sendo uma conta parcelada com valor IMPAR retornar a lista de parcelas com cada valor correto', () => {
            conta.quantidadeParcelas = 3;
            conta.valor = 97;
            conta = contaNegocio.criar(conta);
            conta.parcelas.forEach(parcela => {
                expect(parcela.valor).toBeCloseTo(32.33, 2);
            });
        });

        it('com uma conta parcelada com a primeira data de vencimento setada retornar corretamente o '
            + 'vencimento das proximas parcelas', () => {
            conta.quantidadeParcelas = 3;
            conta.dataVencimento = new Date('2019-12-15');
            conta = contaNegocio.criar(conta);
            const vencimentos: Date[] = conta.parcelas.map((parcela: Parcela) => parcela.dataVencimento);
            const vencimentosEsperados = [new Date('2019-12-15'), new Date('2020-01-15'), new Date('2020-02-15')];
            expect(vencimentosEsperados).toEqual(vencimentos);
        });

        it('deve setar o status inicial da conta como em aberto', () => {
            conta = contaNegocio.criar(conta);
            expect(conta.status === StatusConta.EM_ABERTO);
        });

        it('sendo uma conta com tipo CREDITO ou DEBITO deve lançar um erro caso o cartão não seja informado', () => {
            delete conta.cartao;
            expect(() => {
                contaNegocio.criar(conta);
            }).toThrow(new ContaException(ContaException.CARTAO_OBRIGATORIO));
        });

    });

    describe('ao alterar uma conta', () => {

        it('deve lançar um erro caso o id não seja fornecido', async () => {
            await expect(contaNegocio.alterar(null, conta)).rejects.toThrow(new ContaException(ContaException.ID_OBRIGATORIO));
        });

        it('deve lançar um erro com uma data de vencimento inválida', async () => {
            conta.dataVencimento = null;
            await expect(contaNegocio.alterar(1, conta)).rejects.toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
        });

        it('deve lançar um erro com um valor igual ou inferior a zero', async () => {
            conta.valor = 0;
            await expect(contaNegocio.alterar(1, conta)).rejects.toThrow(new ContaException(ContaException.VALOR_INVALIDO));
        });

        it('deve lançar um erro caso o tipo da conta não for informado', async () => {
            conta.tipo = null;
            await expect(contaNegocio.alterar(1, conta)).rejects.toThrow(new ContaException(ContaException.TIPO_INVALIDO));
        });

        it('deve lançar um erro caso o tipo informado seja inválido', async () => {
            delete conta.tipo;
            await expect(contaNegocio.alterar(1, conta)).rejects.toThrow(new ContaException(ContaException.TIPO_INVALIDO));
        });

        it('deve lançar um erro caso a data de vencimento não seja informada', async () => {
            delete conta.dataVencimento;
            await expect(contaNegocio.alterar(1, conta)).rejects.toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
        });

        it('deve lançar um erro caso o valor não seja informado', async () => {
            delete conta.valor;
            await expect(contaNegocio.alterar(1, conta)).rejects.toThrow(new ContaException(ContaException.VALOR_INVALIDO));
        });

        it('caso a conta tenha parcelas deve atualizar o valor de cada parcela corretamente ao atualizar um valor', async () => {
            conta.quantidadeParcelas = 3;
            conta.valor = 478;
            conta = await contaNegocio.alterar(1, conta);
            conta.parcelas.forEach(parcela => {
                expect(parcela.valor).toBeCloseTo(159.33, 2);
            });
        });

        it('deve lançar um erro caso o número de parcelas seja informado e o tipo seja diferente de CŔEDITO', async () => {
            conta.quantidadeParcelas = 2;
            conta.tipo = TipoConta.DINHEIRO;
            await expect(contaNegocio.alterar(1, conta)).rejects.toThrow(new ContaException(ContaException.TIPO_INVALIDO_PARCELAS));
        });

        it('inserindo uma nova data de vencimento inicial calcular corretamente os vencimentos de parcelas', async () => {
            conta.dataVencimento = new Date('2019-04-09');
            conta.quantidadeParcelas = 3;
            conta = await contaNegocio.alterar(1, conta);
            const vencimentos: Date[] = conta.parcelas.map((parcela: Parcela) => parcela.dataVencimento);
            const vencimentosEsperados = [new Date('2019-04-09'), new Date('2019-05-09'), new Date('2019-06-09')];
            expect(vencimentos).toEqual(vencimentosEsperados);
        });

        it('validar data de vencimento de parcelas com uma nova data de vencimento em finais de meses \'irregulares\'', async () => {
            conta.dataVencimento = new Date('2019-02-28');
            conta.quantidadeParcelas = 3;
            conta = await contaNegocio.alterar(1, conta);
            const vencimentos: Date[] = conta.parcelas.map((parcela: Parcela) => parcela.dataVencimento);
            const vencimentosEsperados = [new Date('2019-02-28'), new Date('2019-03-28'), new Date('2019-04-28')];
            expect(vencimentos).toEqual(vencimentosEsperados);
        });

        it('validar data de vencimento de parcelas com uma nova data de vencimento em inícios de meses', async () => {
            conta.dataVencimento = new Date('2019-02-01');
            conta.quantidadeParcelas = 3;
            conta = await contaNegocio.alterar(1, conta);
            const vencimentos: Date[] = conta.parcelas.map((parcela: Parcela) => parcela.dataVencimento);
            const vencimentosEsperados = [new Date('2019-02-01'), new Date('2019-03-01'), new Date('2019-04-01')];
            expect(vencimentos).toEqual(vencimentosEsperados);
        });

    });

    describe('ao criar um cartão', () => {

        let cartao;

        beforeAll(() => {
            cartao = {
                descricao: 'Nu Bank',
            };
        });

        it('deve lançar um erro caso a descrição não seja informada', () => {
            delete cartao.descricao;
            expect(() => {
                contaNegocio.validarCartao(cartao);
            }).toThrow(new ContaException(ContaException.CARTAO_DESCRICAO));
        });

        it('deve lançar um erro caso seja informado um valor undefined para o método', () => {
            expect(() => {
                contaNegocio.validarCartao(undefined);
            }).toThrow(new ContaException(ContaException.CARTAO_NULO));
        });

    });

});
