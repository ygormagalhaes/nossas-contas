import { ContaException } from './../conta/conta.exception';
import * as Joi from '@hapi/joi';

export const contaSchema = Joi.object().keys({
    dataVencimento:
        Joi.string()
            .required()
            .regex(/\d{4}-\d{2}-\d{2}/)
            .error(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA)),
});
