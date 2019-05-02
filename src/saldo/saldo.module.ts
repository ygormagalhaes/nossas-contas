import { TransacaoModule } from './../transacao/transacao.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [TransacaoModule]
})
export class SaldoModule {}
