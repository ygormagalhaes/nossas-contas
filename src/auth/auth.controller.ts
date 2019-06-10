import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioPipe } from '../pipes/usuario.pipe';
import { UsuarioPayload } from './../interfaces/usuario-payload.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('')
    async login(@Body(new UsuarioPipe()) payload: UsuarioPayload) {
        return await this.authService.login(payload);
    }
}
