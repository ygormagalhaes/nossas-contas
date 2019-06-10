import { Cartao } from './cartao.model';
import { Injectable } from '@nestjs/common';
import { Parcela } from './parcela.model';
import { Conta } from './conta.model';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { StatusParcela } from './status-parcela.enum';
import { Transacao } from 'src/transacao/transacao.model';

@Injectable()
export class ContaNegocio {

    constructor(
        private readonly usuarioService: UsuarioService,
    ) { }

    criar(conta: Conta) {
        this.validarTipo(conta);
        this.verificarCompraParcelada(conta);
        this.setarDataLancamento(conta);
        this.setarUsuario(conta);
        return conta;
    }

    private validarTipo(conta: Conta) {
        const compraCartao = conta.tipo === TipoConta.CARTAO_CREDITO || conta.tipo === TipoConta.CARTAO_DEBITO;
        if (compraCartao && (!conta.cartao || !conta.cartao.id)) {
            throw new ContaException(ContaException.CARTAO_OBRIGATORIO);
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
        // conta.usuario = usuarioLogado; TODO: Implementar.
    }

    async alterar(id: number, payload: Conta) {
        this.validarId(id);
        this.validarTipo(payload);
        this.verificarCompraParcelada(payload);
        return payload;
    }

    private validarId(id) {
        if (!id) {
            throw new ContaException(ContaException.ID_OBRIGATORIO);
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
