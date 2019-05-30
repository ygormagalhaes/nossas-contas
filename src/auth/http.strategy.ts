import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super();
    }

    async validar(token: string) {
        const usuario = await this.authService.validarUsuario(token);
        if (!usuario) {
            // TODO: Lançar exceção personalizada.
            throw new ForbiddenException();
        }
        return usuario;
    }

}
