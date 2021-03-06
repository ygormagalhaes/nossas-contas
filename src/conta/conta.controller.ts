import { ContaDTO } from './conta.dto';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Cartao } from './cartao.model';
import { ContaPipe } from '../pipes/conta.pipe';
import { AuthGuard } from '@nestjs/passport';
import { CartaoPipe } from '../pipes/cartao.pipe';
import { UsuarioLogado } from '../decorators/usuario-logado.decorator';
import { Usuario } from '../usuario/usuario.model';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('contas')
export class ContaController {

    constructor(private readonly contaService: ContaService) { }

    @Get()
    async listarContas() {
        const contas = await this.contaService.listar();
        return contas;
    }

    @Post()
    async criarConta(@Body(new ContaPipe()) conta: ContaDTO) {
        return await this.contaService.criar(conta);
    }

    @Post('cartao')
    async criarCartao(@Body(new CartaoPipe()) cartao: Cartao, @UsuarioLogado() usuario: Usuario) {
        return await this.contaService.criarCartao(cartao, usuario);
    }

    @Get('cartao')
    async listarCartoes(): Promise<Cartao[]> {
        return await this.contaService.listarCartoes();
    }

}
