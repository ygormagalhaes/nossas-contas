import { NegocioException } from '../core/NegocioException';

export class ContaException extends NegocioException {
    static readonly DATA_VENCIMENTO_INVALIDA = 'Data de vencimento inválida!';
    static readonly VALOR_INVALIDO = 'Valor inválido!';
    static readonly TIPO_INVALIDO = 'Tipo de conta inválido!';
    static readonly USUARIO_NAO_LOGADO = 'Usuário deve estar logado para interagir com contas!';
    static readonly TIPO_INVALIDO_PARCELAS = 'Para contas parceladas o tipo deverá ser como cartão de cŕedito!';
    static readonly ID_OBRIGATORIO = 'Id da conta é obrigatório!';
    static readonly VINCULO_TRANSACAO = 'Não é possível excluir uma conta que tenha uma transação vinculada a ela!';
    static readonly PARCELAS_PAGAS = 'Existem uma ou mais parcelas pagas vinculadas à conta!';
    static readonly CONTA_LIQUIDADA = 'A conta já foi liquidada e não pode ser excluída!';
    static readonly CARTAO_OBRIGATORIO = 'Para esse tipo de conta é obrigatório informar o cartão utilizado!';
    static readonly CARTAO_DESCRICAO = 'Ao inserir um novo cartão o campo descrição é obrigatório!';
    static readonly CARTAO_NULO = 'Informações do cartão inválidas ou nulas!';
}
