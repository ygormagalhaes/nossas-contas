import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  providers: [ContaService]
})
export class ContaModule {}
