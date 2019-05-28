import { Repository, EntityRepository } from 'typeorm';
import { Usuario } from './usuario.model';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {

    async criar(usuarioPayload: any) {
        const usuario = this.create(usuarioPayload);
        return await this.save(usuario);
    }
}
