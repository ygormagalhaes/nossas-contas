import { Module } from '@nestjs/common';
import { ContaModule } from './conta/conta.module';
import { SaldoModule } from './saldo/saldo.module';
import { TransacaoModule } from './transacao/transacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [ContaModule, SaldoModule, TransacaoModule, UsuarioModule, UtilsModule],
})
export class AppModule {}
