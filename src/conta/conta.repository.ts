import { EntityRepository, AbstractRepository } from 'typeorm';
import { Conta } from './conta.model';

@EntityRepository(Conta)
export class ContaRepository extends AbstractRepository<Conta> {

    async listarContas() {
        const contas = await super.repository.find();
        return contas;
    }

    async excluir(id: number) {
        await super.repository.delete({ id });
    }

    async salvar(conta: Conta) {
        return await this.manager.create(Conta, conta);
    }

}
