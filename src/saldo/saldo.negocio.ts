import { Injectable } from '@nestjs/common';
import { Transacao } from './../transacao/transacao.model';
import { TransacaoService } from './../transacao/transacao.service';
import { TipoTransacao } from '../transacao/tipo-transacao.enum';
import { ContaService } from '../conta/conta.service';
import { Conta } from 'src/conta/conta.model';

@Injectable()
export class SaldoNegocio {

    constructor(private readonly transacaoService: TransacaoService,
                private readonly contaService: ContaService) {}

    async obter(data: Date): Promise<number> {
        let saldoFinal = 0;
        const saldoTransacoes = await this.processaTransacoesDoMes(data);
        saldoFinal += saldoTransacoes; // Apenas soma pois o saldo poderá vir negativo ou positivo.
        const saldoContas = await this.processaContasDoMes(data);
        saldoFinal -= saldoContas; // Subtrai pois o processamento totaliza os valores das contas obtidas.
        // TODO: Obter o total em dinheiro do mês (salários, freelas, etc...)
        return saldoFinal;
    }

    private async processaContasDoMes(data: Date) {
        const contasDoMes: Conta[] = await this.contaService.obterDoMesSemParcelas(data);
        let saldoContas = 0;
        contasDoMes.forEach(conta => {
            saldoContas += conta.valor;
        });
        return saldoContas;
    }

    private async processaTransacoesDoMes(date: Date): Promise<number> {
        const transacoesDoMes: Transacao[] = await this.transacaoService.obterDoMes(date);
        let saldoTransacoes = 0;
        transacoesDoMes.forEach(transacao => {
            if (transacao.tipo === TipoTransacao.ENTRADA) {
                saldoTransacoes += transacao.valor;
            } else if (transacao.tipo === TipoTransacao.SAIDA) {
                saldoTransacoes -= transacao.valor;
            }
        });

        return saldoTransacoes;
    }
}
