import { ParseUsuarioPipe } from './parse-usuario.pipe';
import { UsuarioException } from '../usuario/usuario.exception';

describe('ParseUsuarioPipe', () => {

    it('deve lançar um erro caso o payload seja nulo', () => {
        expect(() => {
            new ParseUsuarioPipe().transform(undefined, undefined);
        }).toThrow(new UsuarioException(UsuarioException.DADOS_NULOS));
    });

    it('deve lançar um erro caso o payload tenha um email nulo', () => {
        expect(() => {
            new ParseUsuarioPipe().transform({
                email: undefined,
            }, undefined);
        }).toThrow(new UsuarioException(UsuarioException.EMAIL_NULO));
    });

    it('deve lançar um erro caso o payload tenha um email inválido', () => {
        expect(() => {
            new ParseUsuarioPipe().transform({
                email: 'foobar',
            }, undefined);
        }).toThrow(new UsuarioException(UsuarioException.EMAIL_INVALIDO));
    });

});
