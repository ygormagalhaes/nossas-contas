import { ContaException } from './../conta/conta.exception';
import { cartaoSchema } from './../joi-schemas/cartao.schema';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as Joi from '@hapi/joi';

@Injectable()
export class CartaoPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            throw new ContaException(ContaException.CARTAO_NULO);
        }

        const { error } = Joi.validate(value, cartaoSchema);
        if (error) {
            throw error;
        }

        return value;
    }
}
