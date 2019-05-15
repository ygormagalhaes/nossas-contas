import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conta } from './conta.model';
import { Repository } from 'typeorm';

@Injectable()
export class ContaDAO {

    constructor(@InjectRepository(Conta) private readonly contaRepository: Repository<Conta>) {}

    async listarContas() {
        const contas = await this.contaRepository.find();
        return contas;
    }
}
