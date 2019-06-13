import { EntityRepository, Repository } from 'typeorm';
import { Conta } from './conta.model';

@EntityRepository(Conta)
export class ContaRepository extends Repository<Conta> {

    async listarContas() { // TODO: Remover método e chamar diretamente o disponivel por Repository.
        const contas = await this.find();
        return contas;
    }

    async excluir(id: number) { // TODO: Remover método e chamar diretamente o disponivel por Repository.
        await this.delete({ id });
    }

    async salvar(conta: Conta) {
        conta = this.create(conta);
        return await this.save(conta);
    }

}
