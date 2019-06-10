import { TipoConta } from './../conta/tipo-conta.enum';
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
        }).toThrow(new ContaException(ContaException.DADOS_NULOS));
    });

    it('deve lançar um erro caso o payload contenha uma data inválida', () => {
        payload.dataVencimento = 'foo';
        expect(() => {
            new ParseContaPipe().transform(payload, undefined);
        }).toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
    });

});
