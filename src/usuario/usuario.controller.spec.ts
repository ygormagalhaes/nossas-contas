import { UsuarioRepository } from './usuario.repository';
import { UsuarioService } from './usuario.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';

describe('Usuario Controller', () => {
  let controller: UsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [UsuarioService, UsuarioRepository]
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
