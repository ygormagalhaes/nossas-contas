import { ContaException } from './../conta/conta.exception';
import { CartaoPipe } from './cartao.pipe';

describe('CartaoPipe', () => {
    it('should be defined', () => {
        expect(new CartaoPipe()).toBeDefined();
    });

    it('deve lançar um erro caso o payload do cartão seja nulo', () => {
        expect(() => {
            new CartaoPipe().transform(undefined, undefined);
        }).toThrow(new ContaException(ContaException.CARTAO_NULO));
    });

    it('deve lançar um erro caso a descrição do cartão tenha menos que 4 caracteres', () => {
        expect(() => {
            new CartaoPipe().transform({ descricao: 'foo' }, undefined);
        }).toThrow(new ContaException(ContaException.CARTAO_DESCRICAO));
    });

    it('deve lançar um erro caso a descrição do cartão seja undefined', () => {
        expect(() => {
            new CartaoPipe().transform({ descricao: undefined }, undefined);
        }).toThrow(new ContaException(ContaException.CARTAO_DESCRICAO));
    });

    it('não deve lançar nenhum erro com um payload válido', () => {
        expect(() => {
            new CartaoPipe().transform({ descricao: 'nu bank ygor' }, undefined);
        }).not.toThrowError();
    });

});
