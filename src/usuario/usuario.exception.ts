import { NegocioException } from '../core/negocio-exception';

export class UsuarioException extends NegocioException {
    static readonly DADOS_NULOS = 'Dados nulos!';
    static readonly EMAIL_NULO = 'Email nulo!';
    static readonly EMAIL_INVALIDO = 'Email inválido!';
    static readonly USUARIO_NAO_LOGADO = 'Usuário não está logado!';
}
