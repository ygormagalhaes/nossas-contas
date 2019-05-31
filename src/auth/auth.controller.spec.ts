import { UsuarioRepository } from './../usuario/usuario.repository';
import { UsuarioPayload } from './../interfaces/usuario-payload.interface';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from './../usuario/usuario.service';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('Auth Controller', () => {
    let controller: AuthController;
    let payload: UsuarioPayload;
    let usuarioService: UsuarioService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secretOrPrivateKey: 'foobar',
                    signOptions: {
                        expiresIn: 3600,
                    },
                }),
            ],
            controllers: [AuthController],
            providers: [
                AuthService,
                UsuarioService,
                UsuarioRepository,
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        usuarioService = module.get<UsuarioService>(UsuarioService);

        payload = {
            email: 'foo@bar.com',
            senha: '12345678',
        };
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('deve retornar um token após um post com um payload válido', async () => {
        spyOn(usuarioService, 'obterPorEmailSenha').and.returnValue({ id: 1 });
        expect(await controller.login(payload)).toEqual(expect.objectContaining({
            token: expect.anything(),
        }));
    });
});
