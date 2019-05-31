import { Controller, Post, Body } from '@nestjs/common';
import { ParseUsuarioPipe } from './../pipes/parse-usuario.pipe';
import { UsuarioPayload } from './../interfaces/usuario-payload.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('')
    async login(@Body(new ParseUsuarioPipe()) payload: UsuarioPayload) {
        return await this.authService.login(payload);
    }
}
