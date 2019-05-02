import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioException } from './usuario.exception';

@Module({
  providers: [UsuarioService],
  exports: [UsuarioService, UsuarioException],
})
export class UsuarioModule {}