export class TransacaoException extends Error {
    static readonly TRANSACAO_NULA = 'Objeto transação vazio!';
    static readonly VALOR_INVALIDO = 'Valor de transação inválido!';
}