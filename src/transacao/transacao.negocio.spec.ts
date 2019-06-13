import { UsuarioRepository } from './../usuario/usuario.repository';
import { ContaNegocio } from './../conta/conta.negocio';
import { UsuarioService } from './../usuario/usuario.service';
import { CartaoRepository } from './../conta/cartao.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ContaRepository } from '../conta/conta.repository';
import { TipoTransacao } from './tipo-transacao.enum';
import { TransacaoException } from './transacao.exception';
import { TransacaoNegocio } from './transacao.negocio';
import { ContaService } from '../conta/conta.service';
import { TransacaoService } from './transacao.service';
import { StatusConta } from '../conta/status-conta.enum';
import { StatusParcela } from '../conta/status-parcela.enum';

describe('TransacaoNegocio', () => {

    describe('ao adicionar uma transação', () => {
        let transacaoNegocio: TransacaoNegocio;
        let contaService: ContaService;
        let transacao;

        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    TransacaoNegocio,
                    TransacaoService,
                    // Submeter issue para projeto no github. Ref: https://github.com/nestjs/nest/issues/363
                    ContaRepository,
                    CartaoRepository,
                    ContaService,
                    ContaNegocio,
                    UsuarioService,
                    UsuarioRepository,
                ],
            }).compile();

            transacaoNegocio = module.get<TransacaoNegocio>(TransacaoNegocio);
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
            transacao.conta = { id: 1 };

            const mockConta = {
                valor: 10,
                status: StatusConta.EM_ABERTO,
            };
            spyOn(contaService, 'detalhar').and.returnValue(mockConta);
            spyOn(contaService, 'atualizar').and.stub();
            await transacaoNegocio.criar(transacao);
            expect(contaService.atualizar).toBeCalledWith(expect.objectContaining({ status: StatusConta.LIQUIDADA }));
        });

        it('deve retornar um erro caso o valor da transação não seja compatível com valor de conta', async () => {
            transacao.conta = { id: 1 };

            const mockConta = {
                valor: 11,
                status: StatusConta.EM_ABERTO,
            };
            spyOn(contaService, 'detalhar').and.returnValue(mockConta);
            spyOn(contaService, 'criar').and.stub();
            await expect(transacaoNegocio.criar(transacao))
                .rejects.toThrow(new TransacaoException(TransacaoException.VALOR_INCOMPATIVEL_COM_CONTA));
        });

        it('deve atualizar o status de uma parcela após o pagamento', async () => {
            transacao.parcela = { id: 1 };

            const mockParcela = {
                valor: 10,
                status: StatusParcela.EM_ABERTO,
                conta: {
                    id: 1,
                },
            };
            spyOn(contaService, 'detalharParcela').and.returnValue(mockParcela);
            spyOn(contaService, 'salvarParcela').and.stub();
            spyOn(contaService, 'atualizar').and.stub();
            spyOn(contaService, 'obterParcelasAposData').and.returnValue([]);
            await transacaoNegocio.criar(transacao);
            expect(contaService.salvarParcela).toBeCalledWith(expect.objectContaining({ status: StatusParcela.PAGA }));
        });

        it('deve retornar um erro caso o valor da transação não seja compatível com valor da parcela', async () => {
            transacao.parcela = { id: 1 };

            const mockParcela = {
                valor: 11,
                status: StatusParcela.EM_ABERTO,
            };
            spyOn(contaService, 'detalharParcela').and.returnValue(mockParcela);
            spyOn(contaService, 'salvarParcela').and.stub();
            await expect(transacaoNegocio.criar(transacao))
                .rejects.toThrow(new TransacaoException(TransacaoException.VALOR_INCOMPATIVEL_COM_PARCELA));
        });

        it('deve setar a data da transação como a data do sistema caso ela não tenha sido informada', async () => {
            const novaTransacao = await transacaoNegocio.criar(transacao);
            expect(novaTransacao.data).toBeDefined();
        });

        it('deve atualizar o status de uma parcela e da conta após o pagamento da última parcela', async () => {
            transacao.parcela = { id: 1 };
            const mockParcela = {
                valor: 10,
                status: StatusParcela.EM_ABERTO,
                conta: {
                    id: 1,
                },
            };
            spyOn(contaService, 'detalharParcela').and.returnValue(mockParcela);
            spyOn(contaService, 'salvarParcela').and.stub();
            spyOn(contaService, 'atualizar').and.stub();
            spyOn(contaService, 'obterParcelasAposData').and.returnValue([]);
            await transacaoNegocio.criar(transacao);
            expect(contaService.salvarParcela).toBeCalledWith(expect.objectContaining({ status: StatusParcela.PAGA }));
            expect(contaService.atualizar).toBeCalledWith(expect.objectContaining({ status: StatusConta.LIQUIDADA }));
        });

        it('deve atualizar o status de uma parcela e não da conta após o pagamento de uma parcela que não seja a última', async () => {
            transacao.parcela = { id: 1 };
            const mockParcela = {
                valor: 10,
                status: StatusParcela.EM_ABERTO,
                conta: {
                    id: 1,
                },
            };
            spyOn(contaService, 'detalharParcela').and.returnValue(mockParcela);
            spyOn(contaService, 'salvarParcela').and.stub();
            spyOn(contaService, 'criar').and.stub();
            spyOn(contaService, 'obterParcelasAposData').and.returnValue([{ id: 2 }]);
            await transacaoNegocio.criar(transacao);
            expect(contaService.salvarParcela).toBeCalledWith(expect.objectContaining({ status: StatusParcela.PAGA }));
            expect(contaService.criar).not.toBeCalled();
        });

        it('lançar um erro caso seja informado uma conta e uma parcela ao mesmo tempo', async () => {
            transacao.parcela = { id: 1 };
            transacao.conta = { id: 1 };
            await expect(transacaoNegocio.criar(transacao))
                .rejects.toThrow(new TransacaoException(TransacaoException.CONTA_E_PARCELA_INFORMADAS));
        });
    });

});
