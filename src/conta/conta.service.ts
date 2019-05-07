import { Injectable } from '@nestjs/common';
import { Conta } from './conta.model';

@Injectable()
export class ContaService {

    async detalhar(id: number): Promise<Conta> {
        throw new Error('Implementar método');
    }

    async salvar(conta: Conta): Promise<Conta> {
        throw new Error('Implementar método');
    }

    async obterDoMesAVista(date: Date): Promise<Conta[]> {
        throw new Error('Implementar método');
    }

}
