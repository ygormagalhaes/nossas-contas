import { Cartao } from './cartao.model';
import { Injectable } from '@nestjs/common';
import { Parcela } from './parcela.model';
import { Conta } from './conta.model';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { EnumUtils } from '../utils/enum.utils';
import { StatusParcela } from './status-parcela.enum';
import { ContaService } from './conta.service';
import { StatusConta } from './status-conta.enum';

@Injectable()
export class ContaNegocio {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly contaService: ContaService,
    ) { }

    criar(conta: Conta) {
        this.validarDataVencimento(conta);
        this.validarTipo(conta);
        this.validarValor(conta);
        this.verificarCompraParcelada(conta);
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

        const compraCartao = conta.tipo === TipoConta.CARTAO_CREDITO || conta.tipo === TipoConta.CARTAO_DEBITO;
        if (conta.tipo === TipoConta.DINHEIRO) {
            this.vincularTransacaoCompraDinheiro(conta);
        } else if (compraCartao && (!conta.cartao || !conta.cartao.id)) {
            throw new ContaException(ContaException.CARTAO_OBRIGATORIO);
        }
    }

    private vincularTransacaoCompraDinheiro(conta: Conta): void {
        const transacao = {
            valor: conta.valor,
            conta,
            data: new Date(),
            descricao: `Pagamento da conta: ${conta.descricao}`,
        };

        conta.transacao = transacao as any;
    }

    private validarValor(conta: Conta) {
        if (!conta.valor || conta.valor <= 0) {
            throw new ContaException(ContaException.VALOR_INVALIDO);
        }
    }

    private verificarCompraParcelada(conta: Conta) {
        const parcelado = conta.quantidadeParcelas && conta.quantidadeParcelas > 0;
        const compraCartaoCredito = conta.tipo === TipoConta.CARTAO_CREDITO;
        if (parcelado && !compraCartaoCredito) {
            throw new ContaException(ContaException.TIPO_INVALIDO_PARCELAS);
        }

        if (parcelado) {
            this.calcularParcelas(conta);
        }
    }

    private calcularParcelas(conta: Conta) {
        let vencimento = conta.dataVencimento;
        conta.parcelas = [];
        for (let i = 0; i < conta.quantidadeParcelas; i++) {
            const valorParcela = conta.valor / conta.quantidadeParcelas;
            const parcela = {
                conta,
                valor: valorParcela,
                dataVencimento: vencimento,
                status: StatusParcela.EM_ABERTO,
            };
            vencimento = new Date(vencimento);
            vencimento.setUTCMonth(vencimento.getUTCMonth() + 1);
            conta.parcelas.push(parcela as Parcela);
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

    async alterar(id: number, payload: Conta) {
        this.validarId(id);
        this.validarDataVencimento(payload);
        this.validarValor(payload);
        this.validarTipo(payload);
        this.verificarCompraParcelada(payload);
        return payload;
    }

    private validarId(id) {
        if (!id) {
            throw new ContaException(ContaException.ID_OBRIGATORIO);
        }
    }

    async excluir(id: number): Promise<void> {
        await this.verificarSeExisteTransacao(id);
        await this.verificarParcelasPagas(id);
        await this.verificarContaLiquidada(id);
        await this.contaService.excluir(id);
    }

    private async verificarSeExisteTransacao(id: number) {
        const transacao = await this.contaService.obterTransacaoConta(id);
        if (transacao) {
            throw new ContaException(ContaException.VINCULO_TRANSACAO);
        }
    }

    private async verificarParcelasPagas(id: number) {
        const parcelasPagas = await this.contaService.obterParcelasPagas(id);
        if (parcelasPagas && parcelasPagas.length > 0) {
            throw new ContaException(ContaException.PARCELAS_PAGAS);
        }
    }

    private async verificarContaLiquidada(id: number) {
        const conta = await this.contaService.detalhar(id);
        if (conta.status === StatusConta.LIQUIDADA) {
            throw new ContaException(ContaException.CONTA_LIQUIDADA);
        }
    }

    validarCartao(cartao: Cartao): void {
        if (!cartao) {
            throw new ContaException(ContaException.CARTAO_NULO);
        }

        if (!cartao.descricao) {
            throw new ContaException(ContaException.CARTAO_DESCRICAO);
        }
    }
}
