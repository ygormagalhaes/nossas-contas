import * as Joi from '@hapi/joi';
import { BadRequestException } from '@nestjs/common';
import { UsuarioException } from '../usuario/usuario.exception';

export const usuarioSchema = Joi.object().keys({
    email:
        Joi.string()
            .required()
            .email()
            .error(new BadRequestException(UsuarioException.EMAIL_INVALIDO)),
    senha:
        Joi.string()
            .required()
            .min(6)
            .max(8)
            .error(new BadRequestException(UsuarioException.SENHA_INVALIDA)),
});
