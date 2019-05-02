import { Usuario as Usuario } from './../usuario/usuario.model';
import { TipoTransacao } from './tipo-transacao.enum';

export class Transacao {
    valor: number;
    tipo: TipoTransacao;
    usuario: Usuario;
    data: Date;
}
