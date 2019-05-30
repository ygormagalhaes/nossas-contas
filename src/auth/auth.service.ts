import { UsuarioPayload } from './../interfaces/usuario-payload.interface';
import { UsuarioService } from './../usuario/usuario.service';
import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { Usuario } from './../usuario/usuario.model';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
    ) { }

    async login(payload: UsuarioPayload): Promise<string> {
        const usuario = await this.usuarioService.obterPorEmailSenha(payload);
        if (!usuario) {
            throw new ForbiddenException('Credenciais inválidas!'); // TODO: Colocar mensagem em classe de constantes.
        }
        return this.jwtService.sign({ id: usuario.id });
    }

    async validarUsuario(jwtPayload: JwtPayload): Promise<Usuario> {
        return await this.usuarioService.obterPorId(jwtPayload.id);
    }
}
