import { ContaException } from './../conta/conta.exception';
import * as Joi from '@hapi/joi';

export const cartaoSchema = Joi.object().keys({
    descricao:
        Joi.string()
            .min(4)
            .max(255)
            .required()
            .error(new ContaException(ContaException.CARTAO_DESCRICAO)),
});
