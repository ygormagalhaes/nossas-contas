import { AbstractRepository, EntityRepository } from 'typeorm';
import { Cartao } from './cartao.model';

@EntityRepository(Cartao)
export class CartaoRepository extends AbstractRepository<Cartao> {

    async criar(cartao: Cartao): Promise<Cartao> {
        return await super.repository.save(cartao);
    }
}
