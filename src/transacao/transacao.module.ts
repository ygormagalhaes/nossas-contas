import { UtilsModule } from './../utils/utils.module';
import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';

@Module({
    imports: [UtilsModule],
    providers: [TransacaoService],
    exports: [TransacaoService],
})
export class TransacaoModule {}
