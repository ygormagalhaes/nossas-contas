import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { ContaModule } from '../conta/conta.module';
import { TransacaoNegocio } from './transacao.negocio';

@Module({
    imports: [ContaModule],
    providers: [TransacaoService, TransacaoNegocio],
    exports: [TransacaoService],
})
export class TransacaoModule { }
