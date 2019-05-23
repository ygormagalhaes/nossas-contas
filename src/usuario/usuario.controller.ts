import { Controller, Post, Body } from '@nestjs/common';
import { ParseUsuarioPipe } from '../pipes/parse-usuario.pipe';

@Controller('usuario')
export class UsuarioController {

    @Post()
    criar(@Body(new ParseUsuarioPipe()) usuarioPayload: any) {

    }
}
