import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ContaService } from './conta.service';
import { Cartao } from './cartao.model';
import { Conta } from './conta.model';
import { ContaPipe } from '../pipes/conta.pipe';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { CartaoPipe } from '../pipes/cartao.pipe';
import { UsuarioLogado } from '../decorators/usuario-logado.decorator';
import { Usuario } from '../usuario/usuario.model';

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
    async criarConta(@Body(new ContaPipe()) conta: Conta) {
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
