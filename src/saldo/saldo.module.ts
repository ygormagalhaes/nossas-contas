import { ContaModule } from './../conta/conta.module';
import { TransacaoModule } from './../transacao/transacao.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [TransacaoModule, ContaModule],
})
export class SaldoModule { }
