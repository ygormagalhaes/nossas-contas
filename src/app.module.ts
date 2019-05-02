import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaModule } from './conta/conta.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TransacaoModule } from './transacao/transacao.module';
import { UtilsModule } from './utils/utils.module';
import { SaldoModule } from './saldo/saldo.module';

@Module({
  imports: [ContaModule, UsuarioModule, TransacaoModule, UtilsModule, SaldoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
