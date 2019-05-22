import { NegocioException } from '../core/negocio-exception';

export class UsuarioException extends NegocioException {
    static readonly USUARIO_NAO_LOGADO = 'Usuário não está logado!';
}
