import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';
import { AuthException } from './auth.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    // TODO: Verificar aqui o endpoint para liberar /auth
    async validate(jwtPayload: JwtPayload) { // FIXME: Nome obrigatório?
        const usuario = await this.authService.validarUsuario(jwtPayload);
        if (!usuario) {
            throw new AuthException(AuthException.JWT_PAYLOAD_INVALIDO);
        }
        return usuario;
    }
}
