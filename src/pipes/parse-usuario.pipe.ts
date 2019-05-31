import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { Usuario } from '../usuario/usuario.model';
import { usuarioSchema } from '../joi-schemas/usuario.schema';

export class ParseUsuarioPipe implements PipeTransform<any, any> {

    transform(value: any, metadata: ArgumentMetadata): Usuario {
        const { error } = Joi.validate(value, usuarioSchema);
        if (error) {
            throw error;
        }
        return value;
    }
}
