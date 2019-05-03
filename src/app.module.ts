import { Module } from '@nestjs/common';
import { ContaModule } from './conta/conta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TransacaoModule } from './transacao/transacao.module';
import { UtilsModule } from './utils/utils.module';
import { SaldoModule } from './saldo/saldo.module';

@Module({
  imports: [ContaModule, UsuarioModule, TransacaoModule, UtilsModule, SaldoModule],
})
export class AppModule {}
