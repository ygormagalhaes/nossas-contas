import { Injectable } from '@nestjs/common';
import { Conta } from './conta.model';

@Injectable()
export class ContaService {

    async obterDoMesAVista(date: Date): Promise<Conta[]> {
        throw new Error('Implementar método');
    }

}
