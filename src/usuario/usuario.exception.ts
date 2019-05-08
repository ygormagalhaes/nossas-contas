import { NegocioException } from '../core/NegocioException';

export class UsuarioException extends NegocioException {
  static readonly USUARIO_NAO_LOGADO = 'Usuário não está logado!';
}