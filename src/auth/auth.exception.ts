import { NegocioException } from '../core/negocio-exception';

export class AuthException extends NegocioException {
    static readonly CREDENCIAIS_INVALIDAS = 'Dados de acesso inválidos!';
}
