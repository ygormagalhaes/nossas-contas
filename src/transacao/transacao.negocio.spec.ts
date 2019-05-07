import { Test, TestingModule } from '@nestjs/testing';
import { TipoTransacao } from './tipo-transacao.enum';
import { TransacaoException } from './transacao.exception';
import { TransacaoNegocio } from './transacao.negocio';
import { UsuarioService } from '../usuario/usuario.service';
import { ContaService } from '../conta/conta.service';
import { TransacaoService } from './transacao.service';

describe('Ao adicionar uma transação, TransacaoNegocio', () => {
    let transacaoNegocio: TransacaoNegocio;
    let usuarioService: UsuarioService;
    let transacao;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransacaoNegocio, TransacaoService, UsuarioService, ContaService],
        }).compile();

        transacaoNegocio = module.get<TransacaoNegocio>(TransacaoNegocio);
        usuarioService = module.get<UsuarioService>(UsuarioService);

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

    xit('deve atualizar o status de uma conta após o pagamento', () => {});
    xit('deve atualizar o status de uma parcela após o pagamento', () => {});
    xit('deve atualizar o status de uma parcela e da conta após o pagamento da última parcela', () => {});
    xit('deve validar a data da transação', () => {});
});
