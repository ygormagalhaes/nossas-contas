import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.model';

@Injectable()
export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async criar(usuarioPayload: any): Promise<Usuario[]> {
        return await this.usuarioRepository.criar(usuarioPayload);
    }

    getUsuarioLogado() {
        return {}; // TODO: Implementar método.
    }
}
