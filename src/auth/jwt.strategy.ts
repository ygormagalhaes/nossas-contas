import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey', // TODO: COnfigurar através de variáveis de ambiente
        });
    }

    // TODO: Verificar aqui o endpoint para liberar /auth?
    async validar(jwtPayload: JwtPayload) {
        const usuario = await this.authService.validarUsuario(jwtPayload);
        if (!usuario) {
            // TODO: Lançar exceção personalizada.
            throw new ForbiddenException(); // TODO: Incluir mensagem
        }
        return usuario;
    }

}
