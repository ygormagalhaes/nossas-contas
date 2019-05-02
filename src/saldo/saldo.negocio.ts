import { Injectable } from '@nestjs/common';
import { Transacao } from './../transacao/transacao.model';
import { TransacaoService } from './../transacao/transacao.service';
import { TipoTransacao } from '../transacao/tipo-transacao.enum';

@Injectable()
export class SaldoNegocio {

    constructor(private readonly transacaoService: TransacaoService) {}

    async obter(date: Date): Promise<number> {
        let totalTransacoes = 0;
        const saldoTransacoes = await this.processaTransacoesDoMes(date);
        totalTransacoes += saldoTransacoes;
        // TODO: Obter contas com vencimento do mês.
        return totalTransacoes;
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
