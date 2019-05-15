import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from './../utils/utils.module';
import { ContaService } from './conta.service';
import { UsuarioModule } from '../usuario/usuario.module';
import { ContaController } from './conta.controller';
import { ContaRepository } from './conta.repository';

@Module({
    imports: [UsuarioModule, UtilsModule, TypeOrmModule.forFeature([ContaRepository])],
    providers: [ContaService],
    exports: [ContaService],
    controllers: [ContaController],
})
export class ContaModule { }
