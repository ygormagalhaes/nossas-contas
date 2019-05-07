import { TestingModule, Test } from '@nestjs/testing';
import { TransacaoService } from './../transacao/transacao.service';
import { SaldoNegocio } from './saldo.negocio';
import { TipoTransacao } from '../transacao/tipo-transacao.enum';
import { ContaService } from '../conta/conta.service';
import { TransacaoNegocio } from '../transacao/transacao.negocio';

describe('Ao solicitar o saldo mensal, SaldoNegocio', () => {
    let saldoNegocio: SaldoNegocio;
    let transacaoService: TransacaoService;
    let contaService: ContaService;
    let spyTransacaoService: jasmine.Spy;
    let spyContaService: jasmine.Spy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SaldoNegocio, TransacaoService, TransacaoNegocio, ContaService],
        }).compile();

        saldoNegocio = module.get<SaldoNegocio>(SaldoNegocio);
        transacaoService = module.get<TransacaoService>(TransacaoService);
        contaService = module.get<ContaService>(ContaService);

        const transacoesMes: any[] = [
            {valor: 345, tipo: TipoTransacao.ENTRADA},
            {valor: 100, tipo: TipoTransacao.SAIDA},
            {valor: 10, tipo: TipoTransacao.ENTRADA},
            {valor: 500, tipo: TipoTransacao.SAIDA},
        ];
        spyTransacaoService = spyOn(transacaoService, 'obterDoMesEMensais').and.returnValues(transacoesMes);

        const contasMes: any[] = [
            {valor: 120},
            {valor: 33.50},
            {valor: 79.90},
            {valor: 80},
        ];
        spyContaService = spyOn(contaService, 'obterDoMesAVista').and.returnValues(contasMes);
    });

    it('dada uma lista de transações do mês, calcular o saldo corretamente', async () => {
        spyContaService.and.returnValues([]);
        const saldo = await saldoNegocio.obter(new Date());
        expect(saldo).toEqual(-245);
    });

    it('data uma lista de contas do mês, calcular o saldo corretamente', async () => {
        spyTransacaoService.and.returnValues([]);
        const saldo = await saldoNegocio.obter(new Date());
        expect(saldo).toEqual(-313.4);
    });

    it('data a lista de contas e transações obtidas calcular o saldo total corretamente', async () => {
        const saldo = await saldoNegocio.obter(new Date());
        expect(saldo).toEqual(-245 + (-313.4));
    });

});
