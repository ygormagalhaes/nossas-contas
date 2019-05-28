import { NegocioException } from '../core/negocio-exception';

export class UsuarioException extends NegocioException {
    static readonly DADOS_NULOS = 'Dados nulos!';
    static readonly EMAIL_NULO = 'Email nulo!';
    static readonly EMAIL_INVALIDO = 'Email inválido!';
    static readonly SENHA_NULA = 'Senha nula!';
    static readonly SENHA_INVALIDA = 'Senha inválida! Deve conter entre 6 e 8 caracteres!';

    static readonly USUARIO_NAO_LOGADO = 'Usuário não está logado!';
}
