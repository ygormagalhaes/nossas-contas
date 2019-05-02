import { Injectable } from '@nestjs/common';
import { ContaModel } from './conta.model';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class ContaNegocio {

  constructor(private readonly usuarioService: UsuarioService) {}

  // TODO: Reorganizar métodos de acordo com as chamadas.
  adicionar(conta: ContaModel) {
    this.validarDataVencimento(conta);
    this.validarTipo(conta);
    this.validarValor(conta);
    this.setarDataLancamento(conta);
    this.setarUsuario(conta);

    return conta;
  }

  private setarUsuario(conta: ContaModel) {
    const usuarioLogado = this.usuarioService.getUsuarioLogado();
    conta.usuario = usuarioLogado;
  }

  private validarTipo(conta: ContaModel) {
    if (!conta.tipo) {
      throw new ContaException(ContaException.TIPO_INVALIDO);
    }

    // TODO: Criar classe utilitária para verificação de dados de enum.
    const valoresTipo: string[] = Object.keys(TipoConta).map(key => TipoConta[key]);
    if (!valoresTipo.includes(conta.tipo)) {
      throw new ContaException(ContaException.TIPO_INVALIDO);
    }
  }

  private setarDataLancamento(conta: ContaModel) {
    conta.dataLancamento = new Date();
  }

  private validarValor(conta: ContaModel) {
    if (conta.valor <= 0) {
      throw new ContaException(ContaException.VALOR_INVALIDO);
    }
  }

  private validarDataVencimento(conta: ContaModel) {
    if (typeof conta.dataVencimento.getTime !== 'function') {
      throw new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA);
    }
  }
}
