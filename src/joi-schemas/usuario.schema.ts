import * as Joi from '@hapi/joi';
import { UsuarioException } from '../usuario/usuario.exception';

export const usuarioSchema = Joi.object().keys({
    email:
        Joi.string()
            .required()
            .email()
            .error(new UsuarioException(UsuarioException.EMAIL_INVALIDO)),
    senha:
        Joi.string()
            .required()
            .min(6)
            .max(8)
            .error(new UsuarioException(UsuarioException.SENHA_INVALIDA)),
});
