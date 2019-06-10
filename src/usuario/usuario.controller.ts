import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioPipe } from '../pipes/usuario.pipe';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async criar(@Body(new UsuarioPipe()) usuarioPayload: any) {
        const usuario = await this.usuarioService.criar(usuarioPayload);
        return usuario;
    }
}
