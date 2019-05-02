export class ContaException extends Error {
  static readonly DATA_VENCIMENTO_INVALIDA = 'Data de vencimento inválida!';
  static readonly VALOR_INVALIDO = 'Valor inválido!';
  static readonly TIPO_INVALIDO = 'Tipo de conta inválido!';
  static readonly USUARIO_NAO_LOGADO = 'Usuário deve estar logado para interagir com contas!';
}
