import { UsuarioRepository } from './../usuario/usuario.repository';
import { UsuarioService } from './../usuario/usuario.service';
import { UsuarioModule } from './../usuario/usuario.module';
import { ContaNegocio } from './conta.negocio';
import { CartaoRepository } from './cartao.repository';
import { ContaService } from './conta.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ContaController } from './conta.controller';
import { ContaRepository } from './conta.repository';

describe('Conta Controller', () => {
    let controller: ContaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ContaController],
            providers: [
                ContaService,
                ContaRepository,
                ContaNegocio,
                CartaoRepository,
                UsuarioService,
                UsuarioRepository,
            ],
        }).compile();

        controller = module.get<ContaController>(ContaController);
        // contaRepository = module.get<ContaRepository>(ContaRepository);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
