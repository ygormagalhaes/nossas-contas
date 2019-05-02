import { Module } from '@nestjs/common';
import { EnumUtils } from './enum.utils';

@Module({
    exports: [EnumUtils],
})
export class UtilsModule {}
