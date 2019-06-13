import { LoginDTO } from './login.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioPipe } from '../pipes/usuario.pipe';
import { AuthService } from './auth.service';

@Controller('session')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body(new UsuarioPipe()) payload: LoginDTO) {
        return await this.authService.login(payload);
    }

    // TODO: Implementar logout
}
