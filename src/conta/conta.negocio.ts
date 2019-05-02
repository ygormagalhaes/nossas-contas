import { Injectable } from '@nestjs/common';
import { ContaModel } from './conta.model';
import { ContaException } from './conta.exception';

@Injectable()
export class ContaNegocio {

  adicionar(conta: ContaModel) {
    this.validarDataVencimento(conta);
    conta.dataLancamento = new Date();

    if (conta.valor <= 0) {
      throw new ContaException(ContaException.VALOR_INVALIDO);
    }

    return conta;
  }

  private validarDataVencimento(conta: ContaModel) {
    if (typeof conta.dataVencimento.getTime !== 'function') {
      throw new ContaException(ContaException.DATA_VENCIMENTO_INVALIDA);
    }
  }
}
