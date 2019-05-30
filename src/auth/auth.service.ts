import { Usuario } from './../usuario/usuario.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    validarUsuario(token: string): Promise<Usuario> {
        throw new Error('Implementar usuário');
    }
}
