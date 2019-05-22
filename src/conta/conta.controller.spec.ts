import { UsuarioModule } from './../usuario/usuario.module';
import { ContaNegocio } from './conta.negocio';
import { CartaoRepository } from './cartao.repository';
import { ContaService } from './conta.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ContaController } from './conta.controller';
import { ContaRepository } from './conta.repository';

describe('Conta Controller', () => { // TODO: Testar os futuros pipes para cada endpoint.
    let controller: ContaController;
    let contaRepository: ContaRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsuarioModule],
            controllers: [ContaController],
            providers: [
                ContaService,
                ContaRepository,
                ContaNegocio,
                CartaoRepository,
            ],
        }).compile();

        controller = module.get<ContaController>(ContaController);
        contaRepository = module.get<ContaRepository>(ContaRepository);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('deve retornar um array de contas', async () => {
        spyOn(contaRepository, 'listarContas').and.returnValue([]);
        const contas = await controller.listarContas();
        expect(Array.isArray(contas)).toBeTruthy();
    });
});
