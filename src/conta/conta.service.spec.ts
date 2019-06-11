import { ContaService } from './conta.service';
import { TestingModule, Test } from '@nestjs/testing';
import { ContaRepository } from './conta.repository';
import { CartaoRepository } from './cartao.repository';
import { ContaNegocio } from './conta.negocio';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioRepository } from '../usuario/usuario.repository';

describe('ContaService', () => {
    let service: ContaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ContaService,
                ContaRepository,
                CartaoRepository,
                ContaNegocio,
                UsuarioService,
                UsuarioRepository,
            ],
        }).compile();

        service = module.get<ContaService>(ContaService);
    });

    describe('ao criar um cartão', () => {
        let cartao;

        beforeEach(() => {
            cartao = {
                descricao: 'Cartao qualquer',
            };
        });

        it('deve lançar um erro caso o usuário seja undefined', async () => {
            await expect(service.criarCartao(cartao, undefined)).rejects.toThrowError();
        });

    });

});
