import { Injectable } from '@nestjs/common';
import { Usuario } from './usuario.model';
import * as EmailValidator from 'email-validator';
import { UsuarioException } from './usuario.exception';

@Injectable()
export class UsuarioNegocio {

    validar(usuario: Usuario) {
        if (!EmailValidator.validate(usuario.email)) {
            throw new UsuarioException(UsuarioException.EMAIL_INVALIDO);
        }
    }

}
