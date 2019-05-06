import { Transacao } from './transacao.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransacaoService {

    async obterDoMesEMensais(date: Date): Promise<Transacao[]> {
        throw new Error('Implementar método');
        await this.obterMensais();
    }

    private async obterMensais(): Promise<Transacao[]> {
        throw new Error('Implementar método');
    }

}
