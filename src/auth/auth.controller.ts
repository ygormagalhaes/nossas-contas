import { UsuarioPayload } from './../interfaces/usuario-payload.interface';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ParseAuthUsuarioPipe } from '../pipes/parse-auth-usuario.pipe';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('')
    async login(@Body(new ParseAuthUsuarioPipe()) payload: UsuarioPayload) {
        return await this.authService.login(payload);
    }
}
