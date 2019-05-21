import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Cartao } from './cartao.model';
import { Conta } from './conta.model';

@Controller('conta')
export class ContaController {

    constructor(private readonly contaService: ContaService) { }

    @Get()
    async listarContas() {
        const contas = await this.contaService.listar();
        return contas;
    }

    // TODO: Criar pipe para validação do body?
    @Post()
    async criarConta(@Body() conta: Conta) {
        return await this.contaService.criar(conta);
    }

    @Post('cartao')
    async criarCartao(@Body() cartao: Cartao) {
        return await this.contaService.criarCartao(cartao);
    }

}
