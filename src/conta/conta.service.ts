import { Injectable } from '@nestjs/common';
import { CartaoRepository } from './cartao.repository';
import { Cartao } from './cartao.model';
import { Conta } from './conta.model';
import { Parcela } from './parcela.model';
import { Transacao } from '../transacao/transacao.model';
import { ContaRepository } from './conta.repository';
import { ContaNegocio } from './conta.negocio';

@Injectable()
export class ContaService {

    constructor(
        private readonly contaRepository: ContaRepository,
        private readonly cartaoRepository: CartaoRepository,
        private readonly contaNegocio: ContaNegocio) { }

    async detalhar(id: number): Promise<Conta> {
        throw new Error('Implementar método');
    }

    async detalharParcela(id: number): Promise<Parcela> {
        throw new Error('Implementar método');
    }

    async criar(conta: Conta): Promise<Conta> {
        conta = this.contaNegocio.criar(conta);
        // TODO: Verificar necessidade de transação.
        return await this.contaRepository.salvar(conta);
    }

    async salvarParcela(parcela: Parcela): Promise<Parcela> {
        throw new Error('Implementar método');
    }

    async obterDoMesAVista(date: Date): Promise<Conta[]> {
        throw new Error('Implementar método');
    }

    async obterParcelasAposData(idConta: number, dataParcelas: Date): Promise<Parcela[]> {
        throw new Error('Implementar método');
    }

    async excluir(id: number): Promise<void> { // TODO: Verificar erro e traduzir mensagem.
        this.contaRepository.excluir(id);
    }

    async obterTransacaoConta(idConta: number): Promise<Transacao> {
        throw new Error('Implementar método');
    }

    async obterParcelasPagas(idConta: number): Promise<Parcela[]> {
        throw new Error('Implementar método');
    }

    async listar() {
        return await this.contaRepository.listarContas();
    }

    async criarCartao(cartao: Cartao): Promise<Cartao> {
        // this.contaNegocio.validarCartao(cartao);
        return await this.cartaoRepository.criar(cartao);
    }

}
