import { UtilsModule } from './../utils/utils.module';
import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule, UtilsModule],
  providers: [ContaService],
  exports: [ContaService],
})
export class ContaModule {}
