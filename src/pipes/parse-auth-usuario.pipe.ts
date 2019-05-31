import * as Joi from '@hapi/joi';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { usuarioSchema } from '../joi-schemas/usuario.schema';

export class ParseAuthUsuarioPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = Joi.validate(value, usuarioSchema);
        if (error) {
            throw error;
        }
        return value;
    }

}
