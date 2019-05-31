import { ParseUsuarioPipe } from './parse-usuario.pipe';
import { UsuarioException } from '../usuario/usuario.exception';
import { BadRequestException } from '@nestjs/common';

describe('ParseUsuarioPipe', () => {
    let payload;
    beforeEach(() => {
        payload = {
            email: 'foo@bar.com',
            senha: '12345678',
        };
    });

    xit('deve lançar um erro caso o payload seja nulo', () => {
        expect(() => {
            new ParseUsuarioPipe().transform(undefined, undefined);
        }).toThrow(new BadRequestException(UsuarioException.DADOS_NULOS));
    });

    xit('deve lançar um erro caso o payload tenha um email nulo', () => {
        // FIXME: Resolver problema com testes de exceptions lançadas.
        delete payload.email;
        try {
            new ParseUsuarioPipe().transform(payload, undefined);
        } catch (error) {
            expect(error.response.message).toEqual(UsuarioException.EMAIL_INVALIDO);
        }
    });

    xit('deve lançar um erro caso o payload tenha um email inválido', () => {
        payload.email = 'foobar';
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new BadRequestException(UsuarioException.EMAIL_INVALIDO));
    });

    xit('deve lançar um erro caso a senha seja nula', () => {
        delete payload.senha;
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new BadRequestException(UsuarioException.SENHA_INVALIDA));
    });

    xit('deve lançar um erro caso a senha tenha menos que 6 caracteres', () => {
        payload.senha = '123';
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new BadRequestException(UsuarioException.SENHA_INVALIDA));
    });

    xit('deve lançar um erro caso a senha tenha mais que 8 caracteres', () => {
        payload.senha = 'asfasfias0fi0is';
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).toThrow(new BadRequestException(UsuarioException.SENHA_INVALIDA));
    });

    xit('não deve lançar nenhum erro com um payload válido', () => {
        expect(() => {
            new ParseUsuarioPipe().transform(payload, undefined);
        }).not.toThrowError();
    });

});
