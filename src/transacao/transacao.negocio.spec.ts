import { TransacaoException } from './transacao.exception';
import { TransacaoNegocio } from './transacao.negocio';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '../usuario/usuario.service';

describe('Ao adicionar uma transação, TransacaoNegocio', () => {
    let transacaoNegocio: TransacaoNegocio;
    let usuarioService: UsuarioService;
    let transacao;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransacaoNegocio, UsuarioService],
        }).compile();

        transacaoNegocio = module.get<TransacaoNegocio>(TransacaoNegocio);
        usuarioService = module.get<UsuarioService>(UsuarioService);

        transacao = {
            valor: 10,
        };
    });

    it('deve lançar um erro caso a transação seja nula', () => {
        transacao = undefined;
        expect(() => {
            transacaoNegocio.criar(transacao);
        }).toThrow(new TransacaoException(TransacaoException.TRANSACAO_NULA));
    });

    it('deve lançar um erro caso não seja informado um valor', () => {
        delete transacao.valor;
        expect(() => {
            transacaoNegocio.criar(transacao);
        }).toThrow(new TransacaoException(TransacaoException.VALOR_INVALIDO));
    });

    it('deve lançar um erro caso seja informado um valor igual ou inferior a zero', () => {
        transacao.valor = 0;
        expect(() => {
            transacaoNegocio.criar(transacao);
        }).toThrow(new TransacaoException(TransacaoException.VALOR_INVALIDO));
    });

});
