import { UsuarioPayload } from '../interfaces/usuario-payload.interface';
import { UsuarioPipe } from './usuario.pipe';
import { UsuarioException } from '../usuario/usuario.exception';

describe('UsuarioPipe', () => {
    let payload: UsuarioPayload;

    beforeEach(() => {
        payload = {
            email: 'foo@bar.com',
            senha: '12345678',
        };
    });

    it('deve lançar um erro caso o payload seja nulo', () => {
        expect(() => {
            new UsuarioPipe().transform(undefined, undefined);
        }).toThrow(new UsuarioException(UsuarioException.DADOS_NULOS));
    });

    it('deve lançar um erro caso o payload tenha um email nulo', () => {
        delete payload.email;
        expect(() => {
            new UsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.EMAIL_INVALIDO));
    });

    it('deve lançar um erro caso o payload tenha um email inválido', () => {
        payload.email = 'foobar';
        expect(() => {
            new UsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.EMAIL_INVALIDO));
    });

    it('deve lançar um erro caso a senha seja nula', () => {
        delete payload.senha;
        expect(() => {
            new UsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.SENHA_INVALIDA));
    });

    it('deve lançar um erro caso a senha tenha menos que 6 caracteres', () => {
        payload.senha = '123';
        expect(() => {
            new UsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.SENHA_INVALIDA));
    });

    it('deve lançar um erro caso a senha tenha mais que 8 caracteres', () => {
        payload.senha = 'asfasfias0fi0is';
        expect(() => {
            new UsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.SENHA_INVALIDA));
    });

    it('não deve lançar nenhum erro com um payload válido', () => {
        expect(() => {
            new UsuarioPipe().transform(payload, undefined);
        }).not.toThrowError();
    });
});
