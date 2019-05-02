import { UtilsModule } from './../utils/utils.module';
import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/usuario.service';

@Module({
  imports: [UsuarioModule, UtilsModule],
  providers: [ContaService, UsuarioService],
})
export class ContaModule {}
