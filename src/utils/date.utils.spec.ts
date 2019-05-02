import { DateUtils } from './date.utils';

describe('DateUtils', () => {

    it('deve retornar a data com o dia inicial do mês dada uma data informada', () => {
        const testDate = new Date('1991-04-09');
        expect(DateUtils.obterPrimeiroDiaMes(testDate).getDate()).toEqual(1);
    });

    it('deve retornar a data com o dia final do mês dada uma data informada', () => {
        const testDate = new Date('2019-02-09');
        expect(DateUtils.obterUltimoDiaMes(testDate).getDate()).toEqual(28);
    });
});
