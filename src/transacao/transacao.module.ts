import { UtilsModule } from './../utils/utils.module';
import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { ContaModule } from 'src/conta/conta.module';
import { TransacaoNegocio } from './transacao.negocio';

@Module({
    imports: [UtilsModule, ContaModule],
    providers: [TransacaoService, TransacaoNegocio],
    exports: [TransacaoService],
})
export class TransacaoModule {}
