import { JwtService, JwtModule } from '@nestjs/jwt';
import { UsuarioRepository } from './../usuario/usuario.repository';
import { UsuarioService } from './../usuario/usuario.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthException } from './auth.exception';

describe('AuthService', () => {
    let service: AuthService;
    let usuarioService: UsuarioService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                secretOrPrivateKey: 'fooKey',
                signOptions: {
                    expiresIn: 3600,
                }}),
            ],
            providers: [
                UsuarioService,
                UsuarioRepository,
                AuthService,
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usuarioService = module.get<UsuarioService>(UsuarioService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('deve lançar um erro caso UsuarioService não encontre um usuário', async () => {
        jest.spyOn(usuarioService, 'obterPorEmailSenha').mockReturnValue(undefined);
        await expect(service.login({
            email: 'foo@bar.com',
            senha: '12345',
        })).rejects.toThrow(new AuthException(AuthException.CREDENCIAIS_INVALIDAS));
    });
});
