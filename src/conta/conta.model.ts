import { Parcela } from './parcela.model';
import { Usuario } from './../usuario/usuario.model';
import { TipoConta } from './tipo-conta.enum';

export class Conta {
  dataLancamento: Date;
  dataVencimento: Date;
  valor: number;
  tipo: TipoConta;
  usuario: Usuario;
  numeroParcelas?: number;
  parcelas?: Parcela[];
}
