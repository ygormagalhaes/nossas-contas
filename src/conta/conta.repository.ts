import { EntityRepository, AbstractRepository, Repository } from 'typeorm';
import { Conta } from './conta.model';

@EntityRepository(Conta)
export class ContaRepository extends Repository<Conta> {

    async listarContas() {
        const contas = await super.find();
        return contas;
    }

}
