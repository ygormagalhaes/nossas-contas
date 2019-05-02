import { TipoTransacao } from './tipo-transacao.enum';
import { TransacaoException } from './transacao.exception';
import { Transacao } from './transacao.model';
import { EnumUtils } from '../utils/enum.utils';
export class TransacaoNegocio {

    criar(transacao: Transacao) {
        this.validarObjeto(transacao);
        this.validarValor(transacao);
        this.validarTipo(transacao);
        return transacao;
    }

    private validarTipo(transacao: Transacao) {
        if (!EnumUtils.existeValorNoEnum(transacao.tipo, TipoTransacao)) {
            throw new TransacaoException(TransacaoException.TIPO_INVALIDO);
        }
    }

    private validarObjeto(transacao: Transacao) {
        if (!transacao) {
            throw new TransacaoException(TransacaoException.TRANSACAO_NULA);
        }
    }

    private validarValor(transacao: Transacao) {
        if (!transacao.valor || transacao.valor <= 0) {
            throw new TransacaoException(TransacaoException.VALOR_INVALIDO);
        }
    }
}
