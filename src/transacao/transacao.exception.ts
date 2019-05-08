import { NegocioException } from '../core/NegocioException';

export class TransacaoException extends NegocioException {
    static readonly TRANSACAO_NULA = 'Objeto transação vazio!';
    static readonly VALOR_INVALIDO = 'Valor de transação inválido!';
    static readonly TIPO_INVALIDO = 'Tipo de transação inválido!';
    static readonly VALOR_INCOMPATIVEL_COM_CONTA = 'Valor da transação não é compatível com o valor da conta!';
    static readonly VALOR_INCOMPATIVEL_COM_PARCELA = 'Valor da transação não é compatível com o valor da parcela!';
    static readonly CONTA_E_PARCELA_INFORMADAS = 'Não é permitido informar na mesma transação uma conta e uma parcela.'
        + ' A parcela já possui a conta na qual é vinculada!';
}
