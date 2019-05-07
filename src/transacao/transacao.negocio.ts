import { TipoTransacao } from './tipo-transacao.enum';
import { TransacaoException } from './transacao.exception';
import { Transacao } from './transacao.model';
import { EnumUtils } from '../utils/enum.utils';
import { Injectable } from '@nestjs/common';
import { ContaService } from '../conta/conta.service';
import { StatusConta } from '../conta/status-conta.enum';

@Injectable()
export class TransacaoNegocio {

    constructor(private readonly contaService: ContaService) {}

    async criar(transacao: Transacao) {
        this.validarObjeto(transacao);
        this.validarValor(transacao);
        this.validarTipo(transacao);
        await this.verificarLiquidacaoConta(transacao);
        return transacao;
    }

    private validarTipo(transacao: Transacao) {
        if (!EnumUtils.existeValorNoEnum(transacao.tipo, TipoTransacao)) {
            throw new TransacaoException(TransacaoException.TIPO_INVALIDO);
        }
    }

    private validarObjeto(transacao: Transacao) {
        if (!transacao) {
            throw new TransacaoException(TransacaoException.TRANSACAO_NULA);
        }
    }

    private validarValor(transacao: Transacao) {
        if (!transacao.valor || transacao.valor <= 0) {
            throw new TransacaoException(TransacaoException.VALOR_INVALIDO);
        }
    }

    private async verificarLiquidacaoConta(transacao: Transacao) {
        if (transacao.conta) {
            const conta = await this.contaService.detalhar(transacao.conta.id);
            if (!conta.parcelas && conta.valor === transacao.valor) {
                conta.status = StatusConta.LIQUIDADA;
                transacao.conta = conta; //
                await this.contaService.salvar(conta);
            } else if (!conta.parcelas && conta.valor !== transacao.valor) {
                throw new TransacaoException(TransacaoException.VALOR_INCOMPATIVEL_COM_CONTA);
            }
        }
    }
}
