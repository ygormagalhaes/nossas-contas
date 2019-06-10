import * as Joi from '@hapi/joi';
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { UsuarioException } from './../usuario/usuario.exception';
import { Usuario } from '../usuario/usuario.model';
import { usuarioSchema } from '../joi-schemas/usuario.schema';
import { ObjectUtils } from '../utils/object.utils';

export class ParseUsuarioPipe implements PipeTransform<any, any> {

    transform(value: any, metadata: ArgumentMetadata) {
        if (ObjectUtils.isObjectEmpty(value)) {
            throw new UsuarioException(UsuarioException.DADOS_NULOS);
        }

        const { error } = Joi.validate(value, usuarioSchema);
        if (error) {
            throw error;
        }
        return value;
    }
}
