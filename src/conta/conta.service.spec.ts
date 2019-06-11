import { ContaService } from './conta.service';
import { TestingModule, Test } from '@nestjs/testing';
import { ContaRepository } from './conta.repository';
import { CartaoRepository } from './cartao.repository';
import { ContaNegocio } from './conta.negocio';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { Usuario } from 'src/usuario/usuario.model';

describe('ContaService', () => {
    let service: ContaService;
    let cartaoRepository: CartaoRepository;

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
        cartaoRepository = module.get<CartaoRepository>(CartaoRepository);
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

        it('não deve lançar nenhum erro caso o payload e o usuário sejam válidos', async () => {
            spyOn(cartaoRepository, 'criar').and.returnValue({});
            await expect(service.criarCartao(cartao, {id: 1} as Usuario)).resolves.toBeDefined();
        });

    });

});
