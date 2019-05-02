import { Injectable } from '@nestjs/common';
import { ContaModel } from './conta.model';
import { ContaException } from './conta.exception';

@Injectable()
export class ContaNegocio {

  adicionar(conta: ContaModel) {
    this.validarDataVencimento(conta);
    conta.dataLancamento = new Date();
    return conta;
  }

  private validarDataVencimento(conta: ContaModel) {
    if (typeof conta.dataVencimento.getTime !== 'function') {
      throw new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA);
    }
  }
}
