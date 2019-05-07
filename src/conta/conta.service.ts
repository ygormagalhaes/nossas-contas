import { Injectable } from '@nestjs/common';
import { Conta } from './conta.model';
import { Parcela } from './parcela.model';

@Injectable()
export class ContaService {

    async detalhar(id: number): Promise<Conta> {
        throw new Error('Implementar método');
    }

    async detalharParcela(id: number): Promise<Parcela> {
        throw new Error('Implementar método');
    }

    async salvar(conta: Conta): Promise<Conta> {
        throw new Error('Implementar método');
    }

    async salvarParcela(parcela: Parcela): Promise<Parcela> {
        throw new Error('Implementar método');
    }

    async obterDoMesAVista(date: Date): Promise<Conta[]> {
        throw new Error('Implementar método');
    }

}
