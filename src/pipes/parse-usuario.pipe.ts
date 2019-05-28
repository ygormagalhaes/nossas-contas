import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioException } from '../usuario/usuario.exception';
import * as EmailValidator from 'email-validator';

export class ParseUsuarioPipe implements PipeTransform<any, any> {

    transform(payload: any, metadata: ArgumentMetadata): Usuario {
        if (!payload) {
            throw new UsuarioException(UsuarioException.DADOS_NULOS);
        }

        if (!payload.email) {
            throw new UsuarioException(UsuarioException.EMAIL_NULO);
        }

        if (!EmailValidator.validate(payload.email)) {
            throw new UsuarioException(UsuarioException.EMAIL_INVALIDO);
        }

        if (!payload.senha) {
            throw new UsuarioException(UsuarioException.SENHA_NULA);
        }

        if (payload.senha.length < 6) {
            throw new UsuarioException(UsuarioException.SENHA_INVALIDA);
        }

        if (payload.senha.length > 8) {
            throw new UsuarioException(UsuarioException.SENHA_INVALIDA);
        }

        return payload;
    }

}
