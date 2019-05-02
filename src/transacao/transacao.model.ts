import { Parcela } from './../conta/parcela.model';
import { Usuario as Usuario } from './../usuario/usuario.model';
import { TipoTransacao } from './tipo-transacao.enum';
import { Conta } from 'src/conta/conta.model';

export class Transacao {
    valor: number;
    tipo: TipoTransacao;
    usuario: Usuario;
    data: Date;
    descricao: string;
    conta?: Conta; // TODO: Confeccionar testes
    parcela?: Parcela; // TODO: Confeccionar testes
}
