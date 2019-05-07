import { Conta } from './conta.model';
import { StatusParcela } from './status-parcela.enum';

export class Parcela {
    id: number;
    conta: Conta;
    valor: number;
    vencimento: Date;
    status: StatusParcela; // TODO: Confeccionar testes
}
