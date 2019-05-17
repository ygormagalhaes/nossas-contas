import { Injectable } from '@nestjs/common';
import { CartaoRepository } from './cartao.repository';
import { Cartao } from './cartao.model';
import { Conta } from './conta.model';
import { Parcela } from './parcela.model';
import { Transacao } from '../transacao/transacao.model';
import { ContaRepository } from './conta.repository';

@Injectable()
export class ContaService {

    constructor(
        private readonly contaRepository: ContaRepository,
        private readonly cartaoRepository: CartaoRepository) { }

    async detalhar(id: number): Promise<Conta> {
        throw new Error('Implementar método');
    }

    async detalharParcela(id: number): Promise<Parcela> {
        throw new Error('Implementar método');
    }

    async salvar(conta: Conta): Promise<Conta> {
        throw new Error('Implementar método');
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

    async excluir(id: number): Promise<void> {
        throw new Error('Implementar método');
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
