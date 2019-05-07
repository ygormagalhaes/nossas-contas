import { Test, TestingModule } from '@nestjs/testing';
import { TipoTransacao } from './tipo-transacao.enum';
import { TransacaoException } from './transacao.exception';
import { TransacaoNegocio } from './transacao.negocio';
import { UsuarioService } from '../usuario/usuario.service';
import { ContaService } from '../conta/conta.service';
import { TransacaoService } from './transacao.service';
import { StatusConta } from '../conta/status-conta.enum';
import { StatusParcela } from '../conta/status-parcela.enum';

describe('Ao adicionar uma transação, TransacaoNegocio', () => {
    let transacaoNegocio: TransacaoNegocio;
    let usuarioService: UsuarioService;
    let contaService: ContaService;
    let transacao;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransacaoNegocio, TransacaoService, UsuarioService, ContaService],
        }).compile();

        transacaoNegocio = module.get<TransacaoNegocio>(TransacaoNegocio);
        usuarioService = module.get<UsuarioService>(UsuarioService);
        contaService = module.get<ContaService>(ContaService);

        transacao = {
            valor: 10,
            tipo: TipoTransacao.ENTRADA,
        };
    });

    it('deve lançar um erro caso a transação seja nula', async () => {
        transacao = undefined;
        await expect(transacaoNegocio.criar(transacao))
            .rejects.toThrow(new TransacaoException(TransacaoException.TRANSACAO_NULA));
    });

    it('deve lançar um erro caso não seja informado um valor', async () => {
        delete transacao.valor;
        await expect(transacaoNegocio.criar(transacao))
            .rejects.toThrow(new TransacaoException(TransacaoException.VALOR_INVALIDO));
    });

    it('deve lançar um erro caso seja informado um valor igual ou inferior a zero', async () => {
        transacao.valor = 0;
        await expect(transacaoNegocio.criar(transacao))
            .rejects.toThrow(new TransacaoException(TransacaoException.VALOR_INVALIDO));
    });

    it('deve lançar um erro caso seja informado um tipo de transação inválido', async () => {
        transacao.tipo = 'foo';
        expect(transacaoNegocio.criar(transacao))
            .rejects.toThrow(new TransacaoException(TransacaoException.TIPO_INVALIDO));
    });

    it('deve atualizar o status de uma conta após o pagamento', async () => {
        transacao.conta = {id: 1};

        const mockConta = {
            valor: 10,
            status: StatusConta.EM_ABERTO,
        };
        spyOn(contaService, 'detalhar').and.returnValue(mockConta);
        spyOn(contaService, 'salvar').and.stub();
        const novaTransacao = await transacaoNegocio.criar(transacao);
        expect(novaTransacao.conta.status).toEqual(StatusConta.LIQUIDADA);
    });

    it('deve retornar um erro caso o valor da transação não seja compatível com valor de conta', async () => {
        transacao.conta = {id: 1};

        const mockConta = {
            valor: 11,
            status: StatusConta.EM_ABERTO,
        };
        spyOn(contaService, 'detalhar').and.returnValue(mockConta);
        spyOn(contaService, 'salvar').and.stub();
        await expect(transacaoNegocio.criar(transacao))
            .rejects.toThrow(new TransacaoException(TransacaoException.VALOR_INCOMPATIVEL_COM_CONTA));
    });

    it('deve atualizar o status de uma parcela após o pagamento', async () => {
        transacao.parcela = {id: 1};

        const mockParcela = {
            valor: 10,
            status: StatusParcela.EM_ABERTO,
        };
        spyOn(contaService, 'detalharParcela').and.returnValue(mockParcela);
        spyOn(contaService, 'salvarParcela').and.stub();
        const novaTransacao = await transacaoNegocio.criar(transacao);
        expect(novaTransacao.parcela.status).toEqual(StatusParcela.PAGA);
    });

    it('deve retornar um erro caso o valor da transação não seja compatível com valor da parcela', async () => {
        transacao.parcela = {id: 1};

        const mockParcela = {
            valor: 11,
            status: StatusParcela.EM_ABERTO,
        };
        spyOn(contaService, 'detalharParcela').and.returnValue(mockParcela);
        spyOn(contaService, 'salvarParcela').and.stub();
        await expect(transacaoNegocio.criar(transacao))
            .rejects.toThrow(new TransacaoException(TransacaoException.VALOR_INCOMPATIVEL_COM_PARCELA));
    });

    /**
     * 1. Tentar buscar parcelas com vencimentos posteriores à parcela a ser paga
     * 2. Caso não venha nenhuma o status da parcela e da conta deverá ser atualizado
     * 3. Caso tenha mais parcelas apenas o status da parcela é atualizado.
     */
    xit('deve atualizar o status de uma parcela e da conta após o pagamento da última parcela', () => {

    });

    xit('deve validar a data da transação', () => {});
});
