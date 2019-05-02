import { Parcela } from './parcela.model';
import { Usuario } from './../usuario/usuario.model';
import { TipoConta } from './tipo-conta.enum';
import { StatusConta } from './status-conta.enum';

export class Conta {
  dataLancamento: Date;
  dataVencimento: Date;
  valor: number;
  tipo: TipoConta;
  usuario: Usuario;
  numeroParcelas?: number;
  parcelas?: Parcela[];
  status: StatusConta; // TODO: Confeccionar testes
}
