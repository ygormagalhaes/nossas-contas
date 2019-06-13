import { LoginDTO } from './login.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthException } from './auth.exception';
import { UsuarioService } from './../usuario/usuario.service';
import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { Usuario } from './../usuario/usuario.model';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) { }

    async login(payload: LoginDTO): Promise<{token: string}> {
        const usuario = await this.usuarioService.obterPorEmailSenha(payload);
        if (!usuario) {
            throw new AuthException(AuthException.CREDENCIAIS_INVALIDAS);
        }
        const token = this.jwtService.sign({ id: usuario.id });
        return { token };
    }

    async validarUsuario(jwtPayload: JwtPayload): Promise<Usuario> {
        return await this.usuarioService.obterPorId(jwtPayload.id);
    }
}
