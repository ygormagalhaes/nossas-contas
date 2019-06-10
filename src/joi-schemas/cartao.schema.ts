import { ContaException } from './../conta/conta.exception';
import * as Joi from '@hapi/joi';

export const cartaoSchema = Joi.object().keys({
    descricao:
        Joi.string()
            .max(255)
            .required()
            .error(new ContaException(ContaException.CARTAO_DESCRICAO)),
});
