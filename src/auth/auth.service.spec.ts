import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from './../usuario/usuario.repository';
import { UsuarioService } from './../usuario/usuario.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

// TODO: Implementar testes.
xdescribe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuarioService,
                UsuarioRepository,
                JwtService,
                AuthService,
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
