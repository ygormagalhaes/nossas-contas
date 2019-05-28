import { ParseUsuarioPipe } from './parse-usuario.pipe';
import { UsuarioException } from '../usuario/usuario.exception';

describe('ParseUsuarioPipe', () => {
    let payload;
    beforeEach(() => {
        payload = {
            email: 'foo@bar.com',
            senha: '12345678',
        };
    });

    it('deve lançar um erro caso o payload seja nulo', () => {
        expect(() => {
            new ParseUsuarioPipe().transform(undefined, undefined);
        }).toThrow(new UsuarioException(UsuarioException.DADOS_NULOS));
    });

    it('deve lançar um erro caso o payload tenha um email nulo', () => {
        delete payload.email;
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.EMAIL_NULO));
    });

    it('deve lançar um erro caso o payload tenha um email inválido', () => {
        payload.email = 'foobar';
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.EMAIL_INVALIDO));
    });

    it('deve lançar um erro caso a senha seja nula', () => {
        delete payload.senha;
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.SENHA_NULA));
    });

    it('deve lançar um erro caso a senha tenha menos que 6 caracteres', () => {
        payload.senha = '123';
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.SENHA_INVALIDA));
    });

    it('deve lançar um erro caso a senha tenha mais que 8 caracteres', () => {
        payload.senha = 'asfasfias0fi0is';
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new UsuarioException(UsuarioException.SENHA_INVALIDA));
    });

    it('não deve lançar nenhum erro com um payload válido', () => {
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).not.toThrowError();
    });

});
