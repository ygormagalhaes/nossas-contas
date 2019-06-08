import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Cartao } from './cartao.model';
import { Conta } from './conta.model';
import { ParseContaPipe } from '../pipes/parse-conta.pipe';
import { AuthGuard, PassportModule } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('conta')
export class ContaController {

    constructor(private readonly contaService: ContaService) { }

    @Get()
    async listarContas() {
        const contas = await this.contaService.listar();
        return contas;
    }

    @Post()
    async criarConta(@Body(new ParseContaPipe()) conta: Conta) {
        return await this.contaService.criar(conta);
    }

    @Post('cartao')
    async criarCartao(@Body() cartao: Cartao) {
        return await this.contaService.criarCartao(cartao);
    }

}
