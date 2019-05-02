import { Transacao } from './../transacao/transacao.model';
import { TestingModule, Test } from '@nestjs/testing';
import { TransacaoService } from './../transacao/transacao.service';
import { SaldoNegocio } from './saldo.negocio';
import { TipoTransacao } from '../transacao/tipo-transacao.enum';

describe('Ao solicitar o saldo mensal, SaldoNegocio', () => {
    let saldoNegocio: SaldoNegocio;
    let transacaoService: TransacaoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SaldoNegocio, TransacaoService],
        }).compile();

        saldoNegocio = module.get<SaldoNegocio>(SaldoNegocio);
        transacaoService = module.get<TransacaoService>(TransacaoService);

        const transacoesMes: any[] = [
            {valor: 345, tipo: TipoTransacao.ENTRADA},
            {valor: 100, tipo: TipoTransacao.SAIDA},
            {valor: 10, tipo: TipoTransacao.ENTRADA},
            {valor: 500, tipo: TipoTransacao.SAIDA},
        ];
        spyOn(transacaoService, 'obterDoMes').and.returnValues(transacoesMes);
    });

    it('dada uma lista de transações do mês, calcular o saldo correto', async () => {
        const saldo = await saldoNegocio.obter(new Date());
        expect(saldo).toEqual(-245);
    });

});
