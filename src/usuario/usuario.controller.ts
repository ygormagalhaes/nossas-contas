import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ParseUsuarioPipe } from '../pipes/parse-usuario.pipe';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }

    @Post()
    async criar(@Body(new ParseUsuarioPipe()) usuarioPayload: any) {
        const usuario = await this.usuarioService.criar(usuarioPayload);
        return 'foo';
    }
}
