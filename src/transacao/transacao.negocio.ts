import { TipoTransacao } from './tipo-transacao.enum';
import { TransacaoException } from './transacao.exception';
import { Transacao } from './transacao.model';
import { EnumUtils } from '../utils/enum.utils';
import { Injectable } from '@nestjs/common';
import { ContaService } from '../conta/conta.service';
import { StatusConta } from '../conta/status-conta.enum';
import { StatusParcela } from '../conta/status-parcela.enum';

@Injectable()
export class TransacaoNegocio {

    constructor(private readonly contaService: ContaService) {}

    async criar(transacao: Transacao) {
        this.validarObjeto(transacao);
        this.validarValor(transacao);
        this.validarTipo(transacao);
        await this.verificarLiquidacaoConta(transacao);
        await this.verificarPagamentoParcela(transacao);
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

    private async verificarLiquidacaoConta(transacao: Transacao): Promise<void> {
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

    private async verificarPagamentoParcela(transacao: Transacao): Promise<void> {
        if (transacao.parcela) {
            const parcela = await this.contaService.detalharParcela(transacao.parcela.id);
            if (transacao.valor === parcela.valor) {
                parcela.status = StatusParcela.PAGA;
                transacao.parcela = parcela;
                await this.contaService.salvarParcela(parcela);
            } else if (transacao.parcela.valor !== parcela.valor) {
                throw new TransacaoException(TransacaoException.VALOR_INCOMPATIVEL_COM_PARCELA);
            }
        }
    }
}
