import { Conta } from './conta.model';

export class Parcela {
    conta: Conta;
    valor: number;
    vencimento: Date;
}
