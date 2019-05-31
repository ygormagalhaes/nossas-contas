import { ObjectUtils } from './object.utils';

describe('ObjectUtils', () => {
    it('deve retornar false caso um objeto válido seja testado', () => {
        expect(ObjectUtils.isObjectEmpty({ foo: 1 })).toBeFalsy();
    });

    it('deve retornar true caso undefined seja testado', () => {
        expect(ObjectUtils.isObjectEmpty(undefined)).toBeTruthy();
    });

    it('deve retornar true caso null seja testado', () => {
        expect(ObjectUtils.isObjectEmpty(null)).toBeTruthy();
    });

    it('deve retornar true caso {} seja testado', () => {
        expect(ObjectUtils.isObjectEmpty({})).toBeTruthy();
    });
});
