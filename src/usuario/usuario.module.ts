import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioNegocio } from './usuario.negocio';

@Module({
  providers: [UsuarioService, UsuarioNegocio],
  exports: [UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule { }
