import { Module } from '@nestjs/common';
import { ContaService } from './conta.service';

@Module({
  providers: [ContaService]
})
export class ContaModule {}
