import { Transacao } from './transacao.model';
import { TransacaoNegocio } from './transacao.negocio';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransacaoService {

    constructor(private readonly transacaoNegocio: TransacaoNegocio) { }

    // TODO: Utilizar transação para evitar dados erroneos caso aconteça erros ao salvar conta.
    async criar(transacao: Transacao) {
        return await this.transacaoNegocio.criar(transacao);
    }

    async obterDoMesEMensais(date: Date): Promise<Transacao[]> {
        throw new Error('Implementar método');
        // await this.obterMensais();
    }

    private async obterMensais(): Promise<Transacao[]> {
        throw new Error('Implementar método');
    }

}
