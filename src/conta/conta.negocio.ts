import { Injectable } from '@nestjs/common';
import { Conta } from './conta.model';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { EnumUtils } from '../utils/enum.utils';

@Injectable()
export class ContaNegocio {

  constructor(private readonly usuarioService: UsuarioService) {}

  criar(conta: Conta) {
    this.validarDataVencimento(conta);
    this.validarTipo(conta);
    this.validarValor(conta);
    this.setarDataLancamento(conta);
    this.setarUsuario(conta);

    return conta;
  }

  private validarDataVencimento(conta: Conta) {
    if (!conta.dataVencimento) {
      throw new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA);
    }

    const tipoValido = typeof conta.dataVencimento.getTime !== 'function';
    if (tipoValido) {
      throw new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA);
    }
  }

  private validarTipo(conta: Conta) {
    if (!conta.tipo) {
      throw new ContaException(ContaException.TIPO_INVALIDO);
    }

    if (!EnumUtils.existeValorNoEnum(conta.tipo, TipoConta)) {
      throw new ContaException(ContaException.TIPO_INVALIDO);
    }
  }

  private validarValor(conta: Conta) {
    if (!conta.valor || conta.valor <= 0) {
      throw new ContaException(ContaException.VALOR_INVALIDO);
    }
  }

  private setarDataLancamento(conta: Conta) {
    conta.dataLancamento = new Date();
  }

  private setarUsuario(conta: Conta) {
    const usuarioLogado: any = this.usuarioService.getUsuarioLogado();
    if (!usuarioLogado) {
      throw new ContaException(ContaException.USUARIO_NAO_LOGADO);
    }
    conta.usuario = usuarioLogado;
  }

}
