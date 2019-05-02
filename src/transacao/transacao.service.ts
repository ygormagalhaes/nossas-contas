import { Transacao } from './transacao.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransacaoService {

    async obterDoMes(date: Date): Promise<Transacao[]> {
        throw new Error('Implementar método');
    }

}
