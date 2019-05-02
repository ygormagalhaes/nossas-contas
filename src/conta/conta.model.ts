import { TipoConta } from './tipo-conta.enum';

export class ContaModel {
  dataLancamento: Date;
  dataVencimento: Date;
  valor: number;
  tipo: TipoConta;
  usuario: any; // TODO: Implementar model usuário.
}
