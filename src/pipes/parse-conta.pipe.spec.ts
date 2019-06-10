import { ContaException } from './../conta/conta.exception';
import { ParseContaPipe } from './parse-conta.pipe';
describe('ParseContaPipe', () => {
    let payload: any;

    beforeEach(() => {
        payload = {
            dataVencimento: '2019-10-10',
        };
    });

    it('deve lançar um erro caso o payload não possua uma data de vencimento', () => {
        delete payload.dataVencimento;
        expect(() => {
            new ParseContaPipe().transform(payload, undefined);
        }).toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
    });
});
