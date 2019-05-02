import { Usuario as Usuario } from './../usuario/usuario.model';
import { TipoTransacao } from './tipo-transacao.enum';

export class TransacaoModel {
    valor: number;
    tipo: TipoTransacao;
    usuario: Usuario;
}
