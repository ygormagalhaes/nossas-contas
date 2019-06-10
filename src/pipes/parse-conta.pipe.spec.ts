import { TipoConta } from './../conta/tipo-conta.enum';
import { ContaException } from './../conta/conta.exception';
import { ParseContaPipe } from './parse-conta.pipe';
describe('ParseContaPipe', () => {
    let payload: any;

    beforeEach(() => {
        payload = {
            dataVencimento: '2019-10-10',
            tipo: TipoConta.CARTAO_CREDITO,
        };
    });

    it('deve lançar um erro caso o dado seja nulo', () => {
        expect(() => {
            new ParseContaPipe().transform(undefined, undefined);
        }).toThrow(new ContaException(ContaException.DADOS_NULOS));
    });

    it('deve lançar um erro caso o payload não possua uma data de vencimento', () => {
        delete payload.dataVencimento;
        expect(() => {
            new ParseContaPipe().transform(payload, undefined);
        }).toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
    });

    it('deve lançar um erro caso o payload contenha uma data inválida', () => {
        payload.dataVencimento = 'foo';
        expect(() => {
            new ParseContaPipe().transform(payload, undefined);
        }).toThrow(new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA));
    });

    it('deve lançar um erro caso não seja informado um tipo de conta', () => {
        delete payload.tipo;
        expect(() => {
            new ParseContaPipe().transform(payload, undefined);
        }).toThrow(new ContaException(ContaException.TIPO_INVALIDO));
    });

    it('deve lançar um erro caso seja informado um tipo de conta inválido', () => {
        payload.tipo = 'bar';
        expect(() => {
            new ParseContaPipe().transform(payload, undefined);
        }).toThrow(new ContaException(ContaException.TIPO_INVALIDO));
    });

});
