import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { Usuario } from '../usuario/usuario.model';
import { UsuarioException } from '../usuario/usuario.exception';

export class ParseUsuarioPipe implements PipeTransform<any, Usuario> {

    transform(value: any, metadata: ArgumentMetadata): Usuario {
        let usuario: Usuario;
        if (!value) {
            throw new UsuarioException(UsuarioException.DADOS_NULOS);
        }

        return usuario;
    }

}
