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
        saldoFinal = await this.processaTransacoesDoMes(data, saldoFinal);
        saldoFinal = await this.processaContasAVistaDoMes(data, saldoFinal);
        return saldoFinal;
    }

    private async processaContasAVistaDoMes(data: Date, saldoFinal: number) {
        const contasDoMes: Conta[] = await this.contaService.obterDoMesAVista(data);
        let saldoContas = 0;
        contasDoMes.forEach(conta => {
            saldoContas += conta.valor;
        });

        return saldoFinal - saldoContas; // Subtrai pois o processamento totaliza os valores das contas obtidas.
    }

    private async processaTransacoesDoMes(date: Date, saldoFinal: number): Promise<number> {
        const transacoesDoMes: Transacao[] = await this.transacaoService.obterDoMesEMensais(date);
        let saldoTransacoes = 0;
        transacoesDoMes.forEach(transacao => {
            if (transacao.tipo === TipoTransacao.ENTRADA) {
                saldoTransacoes += transacao.valor;
            } else if (transacao.tipo === TipoTransacao.SAIDA) {
                saldoTransacoes -= transacao.valor;
            }
        });

        return saldoFinal + saldoTransacoes; // Apenas soma pois o saldo poderá vir negativo ou positivo.
    }
}
