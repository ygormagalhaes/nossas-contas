import { TestingModule, Test } from '@nestjs/testing';
import { UsuarioNegocio } from './usuario.negocio';
import { UsuarioService } from './usuario.service';
import { UsuarioException } from './usuario.exception';

describe('UsuarioNegocio', () => {

    let usuarioNegocio: UsuarioNegocio;
    let usuario;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsuarioNegocio,
                UsuarioService,
            ],
        }).compile();

        usuarioNegocio = module.get(UsuarioNegocio);

        usuario = {
            email: 'emaildoygor@gmail.com',
        };
    });

    describe('ao criar um usuário', () => {

        it('deve lançar um erro caso o email seja inválido', () => {
            usuario.email = 'foobar.com';
            expect(() => {
                usuarioNegocio.validar(usuario);
            }).toThrow(new UsuarioException(UsuarioException.EMAIL_INVALIDO));
        });

    });

});
