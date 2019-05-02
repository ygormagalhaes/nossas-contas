import { TransacaoException } from './transacao.exception';
import { Transacao } from './transacao.model';
export class TransacaoNegocio {

    criar(transacao: Transacao) {
        this.validarObjeto(transacao);
        this.valirValor(transacao);
        return transacao;
    }

    private validarObjeto(transacao: Transacao) {
        if (!transacao) {
            throw new TransacaoException(TransacaoException.TRANSACAO_NULA);
        }
    }

    private valirValor(transacao: Transacao) {
        if (!transacao.valor || transacao.valor <= 0) {
            throw new TransacaoException(TransacaoException.VALOR_INVALIDO);
        }
    }
}
