import { UtilsModule } from './../utils/utils.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [UtilsModule]
})
export class TransacaoModule {}
