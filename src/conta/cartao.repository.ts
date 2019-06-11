import { EntityRepository, Repository } from 'typeorm';
import { Cartao } from './cartao.model';

@EntityRepository(Cartao)
export class CartaoRepository extends Repository<Cartao> {

    async criar(cartao: Cartao): Promise<Cartao> {
        return await this.save(cartao);
    }
}
