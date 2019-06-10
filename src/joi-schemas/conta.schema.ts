import { TipoConta } from './../conta/tipo-conta.enum';
import { ContaException } from './../conta/conta.exception';
import * as Joi from '@hapi/joi';
import { EnumUtils } from '../utils/enum.utils';

export const contaSchema = Joi.object().keys({
    dataVencimento:
        Joi.string()
            .required()
            .regex(/\d{4}-\d{2}-\d{2}/)
            .error(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA)),
    tipo:
        Joi.string()
            .max(1)
            .required()
            .valid(EnumUtils.getValores<string>(TipoConta))
            .error(new ContaException(ContaException.TIPO_INVALIDO)),
    valor:
        Joi.number()
            .min(0.1)
            .required()
            .error(new ContaException(ContaException.VALOR_INVALIDO)),
});
