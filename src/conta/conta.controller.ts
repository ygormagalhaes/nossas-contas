import { Controller, Get } from '@nestjs/common';
import { ContaService } from './conta.service';

@Controller('conta')
export class ContaController {

    constructor(private readonly contaService: ContaService) {}

    @Get()
    async listarContas() {
        const contas = await this.contaService.listar();
        return contas;
    }

}
