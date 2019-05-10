import { Transacao } from './../transacao/transacao.model';
import { Parcela } from './parcela.model';
import { Injectable } from '@nestjs/common';
import { Conta } from './conta.model';
import { ContaException } from './conta.exception';
import { TipoConta } from './tipo-conta.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { EnumUtils } from '../utils/enum.utils';
import { StatusParcela } from './status-parcela.enum';

@Injectable()
export class ContaNegocio {

    constructor(private readonly usuarioService: UsuarioService) { }

    criar(conta: Conta) {
        this.validarDataVencimento(conta);
        this.validarTipo(conta);
        this.validarValor(conta);
        this.validarParcelado(conta);
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

        if (conta.tipo === TipoConta.DINHEIRO) {
            const transacao = {
                valor: conta.valor,
                conta,
                data: new Date(),
                descricao: `Pagamento da conta: ${conta.descricao}`,
            };

            conta.transacoes = [];
            conta.transacoes.push(transacao as Transacao);
        }
    }

    private validarValor(conta: Conta) {
        if (!conta.valor || conta.valor <= 0) {
            throw new ContaException(ContaException.VALOR_INVALIDO);
        }
    }

    private validarParcelado(conta: Conta) {
        const parcelado = conta.numeroParcelas && conta.numeroParcelas > 0;
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
        for (let i = 0; i < conta.numeroParcelas; i++) {
            const valorParcela = conta.valor / conta.numeroParcelas;
            const parcela = {
                conta,
                valor: valorParcela,
                vencimento,
                status: StatusParcela.EM_ABERTO,
            };
            vencimento = new Date(vencimento);
            vencimento.setMonth(vencimento.getMonth() + 1);
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

    async alterar(conta: Conta) {
        this.validarId(conta);
    }

    private validarId(conta: Conta) {
        if (!conta.id) {
            throw new ContaException(ContaException.ID_OBRIGATORIO);
        }
    }

}
