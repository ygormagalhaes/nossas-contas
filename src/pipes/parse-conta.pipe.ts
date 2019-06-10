import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ObjectUtils } from './../utils/object.utils';
import { ContaException } from '../conta/conta.exception';
import { contaSchema } from '../joi-schemas/conta.schema';
import moment = require('moment');

export class ParseContaPipe implements PipeTransform<any, any> {

    transform(value: any, metadata: ArgumentMetadata) {
        if (ObjectUtils.isObjectEmpty(value)) {
            throw new ContaException(ContaException.DADOS_NULOS);
        }

        const { error } = Joi.validate(value, contaSchema);
        if (error) {
            throw error;
        }
        return value;
    }

}
