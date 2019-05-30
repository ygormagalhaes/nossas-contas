import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaModule } from './conta/conta.module';
import { SaldoModule } from './saldo/saldo.module';
import { TransacaoModule } from './transacao/transacao.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ContaModule,
        SaldoModule,
        TransacaoModule,
        UsuarioModule,
        AuthModule,
    ],
})
export class AppModule { }
