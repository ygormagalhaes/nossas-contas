import { ContaDTO } from './conta.dto';
import { Injectable } from '@nestjs/common';
import { CartaoRepository } from './cartao.repository';
import { Cartao } from './cartao.model';
import { Conta } from './conta.model';
import { Parcela } from './parcela.model';
import { Transacao } from '../transacao/transacao.model';
import { ContaRepository } from './conta.repository';
import { ContaNegocio } from './conta.negocio';
import { Usuario } from 'src/usuario/usuario.model';

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

    async criar(contaDTO: ContaDTO): Promise<Conta> { // TODO: Verificar necessidade de transação.
        const conta = this.contaNegocio.criar(contaDTO);
        return await this.contaRepository.salvar(conta);
    }

    async atualizar(conta: Conta): Promise<Conta> {
        return await this.contaRepository.save(conta);
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

    async criarCartao(cartao: Cartao, usuario: Usuario): Promise<Cartao> {
        this.contaNegocio.atribuirUsuarioCartao(cartao, usuario);
        return await this.cartaoRepository.criar(cartao);
    }

    async listarCartoes(): Promise<Cartao[]> {
        return await this.cartaoRepository.find();
    }

}
