import { UsuarioPayload } from './../interfaces/usuario-payload.interface';
import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async criar(usuarioPayload: any): Promise<Usuario[]> {
        return await this.usuarioRepository.criar(usuarioPayload);
    }

    async obterPorId(id: number): Promise<Usuario> {
        return await this.usuarioRepository.findOne(id);
    }

    async obterPorEmailSenha(payload: UsuarioPayload): Promise<Usuario> {
        return await this.usuarioRepository.findOne(payload);
    }

    getUsuarioLogado() {
        return {}; // TODO: Implementar método.
    }
}
